// src/pages/repartidores/DeliveryList.tsx
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

interface Repartidor {
  id: string;
  idEmpleado: string;
  nombre: string;
  tipoLicencia: string;
}

const DeliveryList: React.FC = () => {
  const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem('repartidores');
    if (data) {
      setRepartidores(JSON.parse(data));
    }
  }, []);

  const deleteRepartidor = (id: string) => {
    const nuevosRepartidores = repartidores.filter(r => r.id !== id);
    setRepartidores(nuevosRepartidores);
    localStorage.setItem('repartidores', JSON.stringify(nuevosRepartidores));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repartidores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton routerLink="/pages/repartidores/nuevo" expand="block" color="primary">
          Agregar Repartidor
        </IonButton>
        <IonList>
          {repartidores.map((repartidor) => (
            <IonItem key={repartidor.id}>
              <IonLabel>
                <h2>{repartidor.idEmpleado}</h2>
                <p>{repartidor.nombre} - {repartidor.tipoLicencia}</p>
              </IonLabel>
              <IonButton color="secondary" onClick={() => history.push(`/pages/repartidores/editar/${repartidor.id}`)}>Editar</IonButton>
              <IonButton color="danger" onClick={() => deleteRepartidor(repartidor.id)}>Eliminar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DeliveryList;
