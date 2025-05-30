// src/pages/repartidores/DeliveryEdit.tsx
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

interface Repartidor {
  id: string;
  idEmpleado: string;
  nombre: string;
  tipoLicencia: string;
}

const DeliveryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [repartidor, setRepartidor] = useState<Repartidor>({
    id: '',
    idEmpleado: '',
    nombre: '',
    tipoLicencia: '',
  });

  useEffect(() => {
    if (id) {
      const data = localStorage.getItem('repartidores');
      if (data) {
        const repartidores: Repartidor[] = JSON.parse(data);
        const repartidorExistente = repartidores.find(r => r.id === id);
        if (repartidorExistente) {
          setRepartidor(repartidorExistente);
        }
      }
    }
  }, [id]);

  const guardar = () => {
    const data = localStorage.getItem('repartidores');
    const repartidores: Repartidor[] = data ? JSON.parse(data) : [];

    if (repartidor.id) {
      // editar
      const actualizados = repartidores.map(r =>
        r.id === repartidor.id ? repartidor : r
      );
      localStorage.setItem('repartidores', JSON.stringify(actualizados));
    } else {
      // nuevo
      repartidor.id = new Date().getTime().toString();
      repartidores.push(repartidor);
      localStorage.setItem('repartidores', JSON.stringify(repartidores));
    }

    history.push('/page/repartidores');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/repartidores" />
          </IonButtons>
          <IonTitle>{id ? 'Editar Repartidor' : 'Nuevo Repartidor'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">ID Empleado</IonLabel>
          <IonInput
            value={repartidor.idEmpleado}
            onIonChange={e => setRepartidor({ ...repartidor, idEmpleado: e.detail.value! })}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            value={repartidor.nombre}
            onIonChange={e => setRepartidor({ ...repartidor, nombre: e.detail.value! })}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tipo Licencia</IonLabel>
          <IonInput
            value={repartidor.tipoLicencia}
            onIonChange={e => setRepartidor({ ...repartidor, tipoLicencia: e.detail.value! })}
          />
        </IonItem>
        <IonButton expand="block" onClick={guardar} className="ion-margin-top">
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DeliveryEdit;
  