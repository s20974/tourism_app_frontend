import { Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { NextPage } from "next";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { connect } from "react-redux";

import { getLastTrips } from "../api/apiCallUserFriends";
import { findTripsByFilter } from "../api/apiCallUserTrips";
import FwmProcessingButton from "../components/FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton";
import FwmDatePicker from "../components/FwmForms/FwmDatePicker/FwmDatePicker";
import FwmInputs from "../components/FwmForms/FwmInputs/FwmInput";
import FwmLocationField from "../components/FwmForms/FwmLocationField/FwmLocationField";
import { FilterIcon } from "../components/FwmIcons/FwmIcons";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import FwmUserTrips from "../components/FwmUserOptions/FwmUserTrips/FwmUserTrips";
import styles from '../styles/trips.module.scss'

const Trips: NextPage = (props: any) => {
    const methods = useForm();
    const { handleSubmit } = methods

    const [isFilterActive, setIsFilterActive] = React.useState(false)
    const [trips, setTrips] = React.useState<any>([])

    React.useEffect(() => {
        getLastTrips(props.user.id)
            .then((res: any) => {
                setTrips(res.data)
            }).catch(
                (err: any) => {
                    console.log(err)
                }
            )
    }, [props.user])

    const [page, setPage] = React.useState(0)

    const [country, setCountry] = React.useState<any>('')
    const [dateFrom, setDateFrom] = React.useState(
        dayjs(new Date())
    );
    const [dateTo, setDateTo] = React.useState(
        dayjs(new Date())
    );

    const onSubmitFilterTripHandler = (values: any, event: any) => {
        event.preventDefault()
   
        const url = `/api/v1/trip?country=${country ?? null}&from=${dayjs(dateFrom).format('YYYY-MM-DD') ?? null}&to=${dayjs(dateTo).format('YYYY-MM-DD') ?? null}&max=${values?.maxPeople ?? null}&page=${page}&size=30`
        findTripsByFilter(url)
            .then((res: any) => { 
                setTrips([...res.data]);
            })
    }

    return (
        <>
            <FwmLeftMenu current='trips' />
            <FwmTopLeftMenu />

            <div className={styles.tripsContainerWrapper}>
                <div className={styles.tripsBlocks}>
                    <Typography>
                        Trips.
                    </Typography>

                    <div className={styles.icons}>
                        <div className={styles.filterIcon} onClick={() => setIsFilterActive(!isFilterActive)}>
                            <FilterIcon />
                        </div>
                    </div>
                </div>

                <div className={`${styles.filtersContainerWrapper} ${isFilterActive ? styles.active : ''}`}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmitFilterTripHandler)}>
                            <div className={`${styles.filtersContainer} ${isFilterActive ? styles.active : ''}`}>
                                <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                                    <Typography>
                                        Date From
                                    </Typography>
                                    <FwmDatePicker
                                        label='Date from'
                                        value={dateFrom}
                                        handleChange={(e: any) => setDateFrom(e)}
                                    />
                                </div>
                                <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                                    <Typography>
                                        Date To
                                    </Typography>
                                    <FwmDatePicker
                                        label='Date to'
                                        value={dateTo}
                                        handleChange={(e: any) => setDateTo(e)}
                                    />
                                </div>
                                <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                                    <Typography>
                                        Country
                                    </Typography>
                                    <FwmLocationField
                                        setForm={setCountry}
                                        error={''}
                                        value={country}
                                    />
                                </div>
                                <div className={`${styles.filterBlock} ${isFilterActive ? styles.active : ''}`}>
                                    <Typography>
                                        Max People
                                    </Typography>
                                    <FwmInputs
                                        id="maxPeople"
                                        label="Max People"
                                        type="number"
                                        inputProps={{ inputProps: { min: 1 } }}
                                    />
                                </div>
                            </div>
                            <div className={styles.filterButtonWrapper}>
                                <FwmProcessingButton text="Search"/>
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <FwmUserTrips userTrips={trips} userId={props.user.id}/>
                <div className={styles.showMore}>
                    { trips?.length == 30 && <FwmProcessingButton onClick={(v:any, e:any) => {onSubmitFilterTripHandler(v, e); setPage(page + 1);}} text="Find More"/> }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps)(Trips)