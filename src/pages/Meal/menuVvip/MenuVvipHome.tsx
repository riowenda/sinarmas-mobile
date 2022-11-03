import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import {
    IonBadge,
    IonButton,
    IonContent,
    IonGrid,
    IonIcon,
    IonItem,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRoute,
    IonText,
    useIonViewDidEnter,
  } from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import { RefresherEventDetail } from '@ionic/core';
import {useTranslation, initReactI18next} from "react-i18next";
import { receiptOutline, restaurantOutline } from "ionicons/icons";
import ListHeader from "../../../components/Header/ListHeader";
import {
    // BASE_API_URL,
    // API_URI,
    PEGAWAI_UNIT_CRUD_URI, PEGAWAI_UNIT_RELEASED_URI,
    pref_json_pegawai_info_login, pref_pegawai_unit_id,
    pref_unit, pref_unit_id,
    pref_identity,
    pref_user_id,
    pref_user_role
  } from "../../../constant/Index";

import { getJsonPref, getPref } from "../../../helper/preferences";
  
  const BASE_API_URL = 'http://182.253.66.235:8000';
  const API_URI = '';
  
  const user = { name: "", email: "", nik: "", imageUrl: "" };
  const userUnit = { id: "", noPol: "", noLambung: "" };
const MenuVvipHome: React.FC = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [identity, setIdentity] = useState<string>();
    const [pegUnitId, setPegUnitId] = useState();
    const [pegawai, setPegawai] = useState(user);
    const [role, setRole] = useState();
    const [unit, setUnit] = useState(userUnit);

    const [items, setItems] = useState([]);
    const { t } = useTranslation();
    const history = useHistory();
    const btnBack = () => {
        history.push("/meal");
    }
    const btnPengajuan = () => {
        history.push("/meal/menusehat/form");
    }

  /* Proses animasi selsai dan sudah sepenuhnya masuk halaman,
  jika load data dilakukan disini sebaiknya diberikan loading screen agar lebih maksimal */
    useIonViewDidEnter(() => {
        loadDataPref();
    });

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log("Begin async operation");

        loadDataMealReq(1);

        setTimeout(() => {
        console.log("Async operation has ended");
        event.detail.complete();
        }, 2000);
    }

    const loadDataPref = () => {
        getJsonPref(pref_json_pegawai_info_login).then((res) => {
        setPegawai(res);
        console.log(res);
        });
        getJsonPref(pref_unit).then((restUnit) => {
            setUnit(restUnit);
        });
        getPref(pref_user_role).then((restRole) => {
        setRole(restRole);
    });


    // getPref(pref_identity).then(res => { setIdentity(res) });
    getPref(pref_pegawai_unit_id).then(res => { setPegUnitId(res); loadDataMealReq(res); });
  }

  const loadDataMealReq = (user: any) => {
    const url = BASE_API_URL + API_URI + "/vviprequests";
    fetch(url).then(res => res.json()).then(
      (result) => {
        console.log(result.data);
        setItems(result.data);
        setIsLoaded(true);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

    
    return (
        <IonPage>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
            <div>
                <ListHeader title="Menu VVIP" link="/meal/menuvvip/form" addButton={true}/>

                
                <div className="bg-white rounded-t-3xl px-2 pt-2 pb-6">
                    <div className="container">
                        <div className="grid items-center justify-center text-center">
                            <IonText className="text-lg">Daftar Pesanan</IonText>
                            <IonButton fill="outline" color="tertiary" onClick={btnPengajuan}>Buat Pesanan</IonButton>
                        </div>
                        <div className="mt-4">
                            <IonList>
                                <div className="p-3 m-1 border-2 border-inherit rounded-md">
                                    <div className="grid grid-cols-12">
                                        <div className="col-start-1 col-end-5 flex items-center justify-start justify-items-start">
                                            28-10-2022
                                        </div>
                                        <div className="col-end-13 col-span-4 flex items-center justify-end justify-items-end">
                                            <IonBadge className="rounded-full p-2" slot="start">Edit</IonBadge> 
                                            <IonBadge className="ml-2 rounded-full p-2" color="medium" slot="end">13:04</IonBadge>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 m-1 border-2 border-inherit rounded-md">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-start-1 col-end-5 flex items-center justify-start justify-items-start">
                                            28-10-2022
                                        </div>
                                        <div className="col-end-13 col-span-4 flex items-center justify-end justify-items-end">
                                            <IonBadge className="rounded-full p-2 text-white bg-amber-500" slot="start">Diantarkan</IonBadge>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 m-1 border-2 border-inherit rounded-md">
                                    <div className="grid grid-cols-12">
                                        <div className="col-start-1 col-end-5 flex items-center justify-start justify-items-start">
                                            22-10-2022
                                        </div>
                                        <div className="col-end-13 col-span-4 flex items-center justify-end justify-items-end">
                                            <IonBadge className="rounded-full p-2 text-white bg-emerald-600" slot="start">Selesai</IonBadge>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 m-1 border-2 border-inherit rounded-md">
                                    <div className="grid grid-cols-12">
                                        <div className="col-start-1 col-end-6 items-center ">
                                            <p>20-10-2022</p>
                                            <i>Alergi Udang</i>
                                        </div>
                                        <div className="col-end-13 col-span-4 flex items-center justify-end justify-items-end">
                                            <IonBadge className="rounded-full p-2 text-white bg-red-500" slot="start">Tidak Pesan</IonBadge>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 m-1 border-2 border-inherit rounded-md">
                                    <div className="grid grid-cols-12">
                                        <div className="col-start-1 col-end-5 flex items-center justify-start justify-items-start">
                                            18-10-2022
                                        </div>
                                        <div className="col-end-13 col-span-4 flex items-center justify-end justify-items-end">
                                            <IonBadge className="rounded-full p-2 text-white bg-amber-500" slot="start">Diantarkan</IonBadge>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center text-indigo-700 mt-4">
                                    Load More ...
                                </div>
                            </IonList>
                        </div>
                    </div>
                    
                </div>
            </div>
        </IonContent>
        </IonPage>
    )
}
export default MenuVvipHome;