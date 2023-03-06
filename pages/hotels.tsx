import { Button, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { NextPage } from "next";
import * as React from 'react'
import { FormProvider, useForm } from "react-hook-form";

import { bookingHotelsSearch } from "../api/apiCallBookingApi";
import FwmProcessingButton from "../components/FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton";
import FwmDatePicker from "../components/FwmForms/FwmDatePicker/FwmDatePicker";
import FwmInputs from "../components/FwmForms/FwmInputs/FwmInput";
import BookingHotelsSearch from "../components/FwmHotelsSearch/BookingHotelsSearch";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import styles from '../styles/hotels.module.scss'

const Hotels: NextPage = () => {
    const methods = useForm();
    const { handleSubmit } = methods

    const [cityCode, setCityCode] = React.useState<any>(null);

    const [dateFrom, setDateFrom] = React.useState(
        dayjs(new Date())
    );
    const [dateTo, setDateTo] = React.useState(
        dayjs(new Date())
    );

    const [hotelsList, setHotelsList] = React.useState<any>([]);

    const onSearch = (values: any, event: any) => {
        event.preventDefault()

        bookingHotelsSearch({
            checkout_date: dayjs(dateTo).format('YYYY-MM-DD'),
            checkin_date: dayjs(dateFrom).format('YYYY-MM-DD'),
            latitude: cityCode.latitude,
            longitude: cityCode.longitude,
            adults_number: values.adults_number,
            room_number: values.adults_number
        }).then((res: any) => {
            setHotelsList(res.data.result)
        })
    }

    return (
        <>
            <FwmLeftMenu current='hotels' />
            <FwmTopLeftMenu />

            <div className={styles.hotelsContainerWrapper}>
                <div className={styles.hotelsBlocks}>
                    <Typography>
                        Hotels.
                    </Typography>
                </div>

                <div className={styles.searchFieldWrapper}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSearch)}>
                            <div className={styles.searchFieldContainer}>
                                <BookingHotelsSearch setCityCode={setCityCode} />
                            </div>
                            <div className={styles.dataInput}>
                                <FwmDatePicker
                                    label='Date from'
                                    value={dateFrom}
                                    handleChange={(e: any) => setDateFrom(e)}
                                ></FwmDatePicker>
                            </div>
                            <div className={styles.dataInput}>
                                <FwmDatePicker
                                    label='Date to'
                                    value={dateTo}
                                    handleChange={(e: any) => setDateTo(e)}
                                ></FwmDatePicker>
                            </div>
                            <div className={styles.dataInput}>
                                <FwmInputs
                                    id="adults_number"
                                    label="Adults Number"
                                    type="number"
                                    inputProps={{ inputProps: { min: 1, max: 10 } }}
                                />
                            </div>
                            <div className={styles.dataInput}>
                                <FwmInputs
                                    id="room_number"
                                    label="Room Number"
                                    type="number"
                                    inputProps={{ inputProps: { min: 1, max: 10 } }}
                                />
                            </div>
                            <div className={styles.sendButton}>
                                <Button type='submit'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>

                <div className={styles.hotelsListWrapper}>
                    {
                        hotelsList && hotelsList.map((value: any) => {
                            return (
                                <>
                                    <div className={styles.hotelCard}>
                                        <div className={styles.hotelImage} style={{backgroundImage: `url(${value.max_1440_photo_url})`}}></div>
                                        <div className={styles.hotelInfoWrapper}>
                                            <Typography>{value.accommodation_type_name}.</Typography>
                                            <Typography>{value.address}.</Typography>
                                        </div>
                                        <div className={styles.showMoreButton}>
                                            <FwmProcessingButton text='Show More' onClick={() => window.location.assign(value.url)} />
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Hotels