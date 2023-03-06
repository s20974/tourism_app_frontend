import { yupResolver } from "@hookform/resolvers/yup";
import { Slider } from "@material-ui/core";
import dayjs from "dayjs";
import { NextPage } from "next";
import * as React from 'react'
import Cropper from "react-easy-crop";
import { FormProvider, useForm } from 'react-hook-form'
import { connect } from "react-redux";

import { getAllPhotosByUserId, uploadUserGalaryFile, uploadUserProfileImage } from "../api/aliCallUserPhotos";
import { addPost, getAllPostByUserId } from "../api/apiCallUserPosts";
import { addTrip, getAllTripsByUserId } from "../api/apiCallUserTrips";
import FwmProcessingButton from "../components/FwmForms/FwmButtons/ProcessingButton/FwmProcessingButton";
import FwmDatePicker from "../components/FwmForms/FwmDatePicker/FwmDatePicker";
import FwmInputs from "../components/FwmForms/FwmInputs/FwmInput";
import FwmLocationField from "../components/FwmForms/FwmLocationField/FwmLocationField";
import { UserPostValidationSchema } from "../components/FwmForms/YupSchemas/UserPostValidationSchema";
import { CirclePlusIcon, PlusIcon } from "../components/FwmIcons/FwmIcons";
import FwmLeftMenu from "../components/FwmLeftMenu/FwmLeftMenu";
import FwmModal from "../components/FwmModal/FwmModal";
import FwmTopLeftMenu from "../components/FwmTopLeftMenu/FwmTopLeftMenu";
import FwmUserButtons from "../components/FwmUserOptions/FwmUserButtons/FwmUserButtons";
import FwmUserHeaderInfo from "../components/FwmUserOptions/FwmUserHeaderInfo/FwmUserHeaderInfo";
import FwmUserPhotos from "../components/FwmUserOptions/FwmUserPhotos/FwmUserPhotos";
import FwmUserPosts from "../components/FwmUserOptions/FwmUserPosts/FwmUserPosts";
import FwmUserTrips from "../components/FwmUserOptions/FwmUserTrips/FwmUserTrips";
import { getCroppedImg } from "../components/Helpers/canvasUtils";
import styles from '../styles/profile.module.scss'

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const Profile: NextPage = (props: any) => {
  const [activeButton, setActiveButton] = React.useState('photos')
  const [imageSrc, setImageSrc] = React.useState<any>()
  const [crop, setCrop] = React.useState<any>({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState<any>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null)
  const [pendingApiCall, setPendingApiCall] = React.useState(false);
  const [photos, setPhotos] = React.useState<any>([])
  const [posts, setPosts] = React.useState<any>([])
  const [croppedImage, setCroppedImage] = React.useState<any>(null)

  const [trips, setTrips] = React.useState([])

  const postMethods = useForm({
    defaultValues: {
      description: '',
      header: '',
    },
    resolver: yupResolver(UserPostValidationSchema),
  })

  const { handleSubmit, formState, reset } = { ...postMethods }

  const updatePhotoList = React.useCallback(() => {
    getAllPhotosByUserId(props.user.id)
      .then((res: any) => {
        setPhotos(res.data)
      }).catch(
        (err: any) => {
          console.log(err)
        }
      )
  }, [props.user.id])

  const updatePostsList = React.useCallback(() => {
    getAllPostByUserId(props.user.id)
      .then((res: any) => {
        setPosts(res.data)
      }).catch(
        (err: any) => {
          console.log(err)
        }
      )
  }, [props.user.id])

  React.useEffect(() => {
    if (activeButton === 'photos') {
      updatePhotoList()
    }

    if (activeButton === 'posts') {
      updatePostsList()
    }

    if (activeButton === 'trips') {
      getAllTripsByUserId(props.user.id)
        .then((res: any) => {
          setTrips(res.data)
        }).catch(
          (err: any) => {
            console.log(err)
          }
        )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeButton, props.user.id])

  const LoadPart = (): JSX.Element => {
    if (activeButton === 'photos') {
      return (
        <FwmUserPhotos
          userGallery={photos}
          isAuthor={true}
          updatePhotosList={updatePhotoList}
          user={props.user}
          currentUserId={props.user.id} />
      )
    } else if (activeButton === 'posts') {
      return (
        <FwmUserPosts
          userPost={posts}
          user={props.user}
          isAuthor={true}
          updatePostsList={updatePostsList}
        />
      )
    } else {
      return (<FwmUserTrips userTrips={trips} />)
    }
  }

  const [country, setCountry] = React.useState<any>('')

  const [dateFrom, setDateFrom] = React.useState(
    dayjs(new Date())
  );
  const [dateTo, setDateTo] = React.useState(
    dayjs(new Date())
  );

  // on file select
  const [showAddPhotoModal, setAddPhotoModal] = React.useState(false)

  const onFileSelect = async (event: any, target?: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const imageDataUrl = await readFile(file)
      setImageSrc(imageDataUrl)
    }

    if (target && target == 'photo') {
      setAddPhotoModal(true)
    }
  }

  // file ref
  const fileRef = React.useRef<any>();

  const [isModalAddPostVisible, setModalAddPostVisible] = React.useState<boolean>(false)
  const [isModalAddTripVisible, setModalAddTripVisible] = React.useState<boolean>(false)

  const LoadIconButton = (): JSX.Element => {
    if (activeButton === 'photos') {
      return (
        <React.Fragment>
          <CirclePlusIcon onClick={() => fileRef?.current.click()} />
          {
            activeButton === 'photos' &&
            <input
              ref={fileRef}
              onChange={(event: any) => onFileSelect(event, 'photo')}
              multiple={true}
              type="file"
              hidden
            />
          }
        </React.Fragment>
      )
    } else if (activeButton === 'posts') {
      return (
        <>
          <CirclePlusIcon onClick={() => setModalAddPostVisible(true)} />
        </>
      )
    } else {
      return (
        <>
          <CirclePlusIcon onClick={() => setModalAddTripVisible(true)} />
        </>
      )
    }
  }

  const [isModalAddImageVisible, setModalAddImageVisible] = React.useState<boolean>(false)

  // on modal close
  const onModalAddProfilePhotoClose = () => {
    setModalAddImageVisible(false)
    setImageSrc(null)
    setCroppedImage(null)
  }

  const onModalAddPhotoClose = () => {
    setAddPhotoModal(false)
    setImageSrc(null)
    setCroppedImage(null)
  }

  // show
  const onCropComplete = React.useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])


  // show cropped image
  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels])

  const onSubmitPostHandler = React.useCallback((values: any, event: any) => {
    event.preventDefault()
    const form_data = new FormData()
    showCroppedImage();
    form_data.append('newPostDto', new Blob([JSON.stringify({
      userEmail: props.user.email,
      header: values.header,
      geoLocation: country,
      description: values.description
    })], {
      type: "application/json"
    }))
    showCroppedImage()

    form_data.append('multipartFile', croppedImage)

    setPendingApiCall(true)

    addPost(form_data).then((res: any) => {
      setPosts((prev: any) => [...prev, res.data])
      setModalAddPostVisible(false)
      reset()
      updatePostsList()
      setPendingApiCall(false)
    }).catch(() => {
      setPendingApiCall(false)
    })

    updatePostsList()
  }, [country, croppedImage, props.user.email, reset, showCroppedImage, updatePostsList])

  React.useEffect(() => {
    if (imageSrc) {
      showCroppedImage()
    }
  }, [imageSrc, showCroppedImage])

  const onClickProfileImageSave = React.useCallback(async () => {
    showCroppedImage();
    setPendingApiCall(true)
    const bodyFormData = new FormData();
    bodyFormData.append("multipartFile", croppedImage);
    uploadUserProfileImage(props.user.email, bodyFormData)
      .then((response) => {
        props.dispatch({
          type: 'upload-user-photo-success',
          payload: response.data,
        })
        setPendingApiCall(false)
        onModalAddProfilePhotoClose()
      }).catch(() => {
        setPendingApiCall(false)
      })

    updatePhotoList()
  }, [croppedImage, props, showCroppedImage, updatePhotoList])

  const onSubmitTripHandler = React.useCallback((values: any, event: any) => {
    event.preventDefault()
    addTrip({
      dateFrom: dateFrom,
      dateTo: dateTo,
      country: country,
      maxPeople: values.maxPeople,
      userId: props.user.id,
      header: values.header,
      description: values.description
    }).then((res: any) => {
      if (res == true) {
        setPosts((prev: any) => {
          [...prev, {
            dateFrom: dateFrom,
            dateTo: dateTo,
            country: country,
            maxPeople: values.maxPeople,
            userId: props.user.id,
            header: values.header,
            description: values.description
          }]
        })
      }
      setModalAddTripVisible(false)
    }).catch((err: any) => {
      console.log(err)
    })
  }, [country, dateFrom, dateTo, props.user.id])

  const galeryFileUpload = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("multipartFile", croppedImage);
    return uploadUserGalaryFile(props.user.email, bodyFormData)
  }

  const onClickSaveGaleryImage = () => {
    showCroppedImage();
    setPendingApiCall(true)
    galeryFileUpload()
      .then((response) => {
        props.dispatch({
          type: 'upload-galery-photo-success',
          payload: response.data,
        })
        setPendingApiCall(false)
        onModalAddProfilePhotoClose()
        updatePhotoList()
      }).catch(() => {
        setPendingApiCall(false)
      })
  }

  return (
    <>
      <FwmLeftMenu current='profile' />
      <FwmTopLeftMenu />
      <FwmUserHeaderInfo
        user={
          {
            name: props.user.name,
            surname: props.user.surname,
            location: '',
            avatar: props.user.mainPhotoUrl,
          }
        }
        profile='user_profile'
        setImageSrc={setImageSrc}
        setModalAddImageVisible={setModalAddImageVisible}
      />

      <FwmUserButtons
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />

      <div className={styles.addButton}>
        <LoadIconButton />
      </div>

      <LoadPart />

      <FwmModal
        id="add-user-profile-photo"
        open={isModalAddImageVisible}
        onClose={onModalAddProfilePhotoClose}
        maxWidth={'sm'}
        headertext='Upload photo below'
      >
        {
          imageSrc &&
          <React.Fragment>
            <div className={styles.cropper}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                classes={{ containerClassName: styles.imageCropper }}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <Slider
              style={{ marginTop: "70px", marginBottom: '20px', color: "#189894" }}
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e: any, zoom: any) => setZoom(zoom)}
            />
            <FwmProcessingButton
              text='upload'
              onClick={onClickProfileImageSave}
              isApiCall={pendingApiCall}
            />
          </React.Fragment>
        }
      </FwmModal>

      <FwmModal
        id="add-user-photo"
        open={showAddPhotoModal}
        onClose={onModalAddPhotoClose}
        maxWidth={'sm'}
        headertext='Upload photo below'
      >
        {
          imageSrc &&
          <React.Fragment>
            <div className={styles.cropper}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={2 / 3}
                classes={{ containerClassName: styles.imageCropper }}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <Slider
              style={{ marginTop: "70px", marginBottom: '20px', color: "#189894" }}
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e: any, zoom: any) => setZoom(zoom)}
            />
            <FwmProcessingButton
              text='upload'
              onClick={onClickSaveGaleryImage}
              isApiCall={pendingApiCall}
            />
          </React.Fragment>
        }
      </FwmModal>

      <FwmModal
        id="add-user-post"
        open={isModalAddPostVisible}
        onClose={() => { setModalAddPostVisible(false); reset(); setImageSrc(null) }}
        maxWidth={'md'}
        headertext='Add post below'
      >
        <React.Fragment>
          <div className={styles.imagePostBlock}>
            {
              !imageSrc &&
              <React.Fragment>
                <div className={styles.addPostImageButton} onClick={() => fileRef?.current.click()} >
                  <PlusIcon />
                </div>
                <input
                  ref={fileRef}
                  onChange={onFileSelect}
                  multiple={true}
                  type="file"
                  hidden
                />
              </React.Fragment>
            }

            {
              imageSrc &&
              <React.Fragment>
                <div className={styles.postImageCropper}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 2}
                    classes={{ containerClassName: styles.imageCropper }}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className={styles.postImageSlider}>
                  <Slider
                    style={{ color: "#189894" }}
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e: any, zoom: any) => setZoom(zoom)}
                  />
                </div>
              </React.Fragment>
            }
          </div>
          <FormProvider {...postMethods}>
            <form onSubmit={handleSubmit(onSubmitPostHandler)}>
              <div className={styles.postInputForm}>
                <FwmInputs
                  id='header'
                  label="Header."
                  error={formState.errors.header}
                />
                <FwmLocationField
                  setForm={setCountry}
                  error={''}
                  value={country}
                />
                <FwmInputs
                  id='description'
                  label="Description."
                  error={formState.errors.description}
                  typemultiline
                />

              </div>
              <div className={styles.uploadPostButton}>
                <FwmProcessingButton
                  text='upload'
                  isApiCall={pendingApiCall}
                />
              </div>
            </form>
          </FormProvider>
        </React.Fragment>
      </FwmModal>

      <FwmModal
        id="add-user-trip"
        open={isModalAddTripVisible}
        onClose={() => { setModalAddTripVisible(false); reset() }}
        maxWidth={'md'}
        headertext='Add trip below'
      >
        <React.Fragment>
          <div className={styles.tripInputForm}>
            <FormProvider {...postMethods}>
              <form onSubmit={handleSubmit(onSubmitTripHandler)}>
                <div className={styles.tripTimeAndPeopleData}>
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
                    {/* <FwmRangeDatePicker/> */}
                  </div>
                  <div className={styles.dataInput}>
                    <FwmInputs
                      id="maxPeople"
                      label="Max People"
                      type="number"
                      inputProps={{ inputProps: { min: 0, max: 10 } }}
                    />
                  </div>
                </div>
                <FwmInputs
                  id="header"
                  error={formState.errors.header}
                  label="Header"
                />
                <FwmLocationField
                  setForm={setCountry}
                  error={''}
                  value={country}
                />
                <FwmInputs
                  id="description"
                  label="Description"
                  error={formState.errors.description}
                  typemultiline
                />
                <div className={styles.uploadPostButton}>
                  <FwmProcessingButton
                    text='upload'
                    isApiCall={pendingApiCall}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </React.Fragment>
      </FwmModal>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(Profile)