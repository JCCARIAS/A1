import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {man,pricetagOutline, folderOpenOutline,clipboardOutline,logoAppleAppstore, menu,archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, people , peopleOutline, carOutline, car, manOutline, pricetag} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Clientes',
    url: '/page/customers',
    iosIcon: peopleOutline,
    mdIcon: people
  },
  {
    title: 'Inicio',
    url: '/page/Inicio',
    iosIcon: menu,
    mdIcon: menu
  },
  {
    title: 'Gestión de Pedidos',
    url: '/page/Pedidos',
    iosIcon: pricetagOutline,
    mdIcon: pricetag
  },
 
  {
    title: 'Almacén',
    url: '/folder/Almacen  ',
    iosIcon: folderOpenOutline,
    mdIcon: folderOpenOutline
  },
  {
    title: 'Repartidores',
    url: '/page/Repartidores',
    iosIcon: manOutline,
    mdIcon: man  
  },
  {
    title: 'Vehículos',
    url: '/page/Vehiculos',
    iosIcon: carOutline,
    mdIcon: car
  },
  {
    title: 'Reportes',
    url: '/page/Reportes',
    iosIcon: clipboardOutline,
    mdIcon: clipboardOutline
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="Enlatados MG S.A-list">
          <IonListHeader>Proyectos Enlatados MG</IonListHeader>
          <IonNote>clientes@enlatadosmg.com.gt</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDir ection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
