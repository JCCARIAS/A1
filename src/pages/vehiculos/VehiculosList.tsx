// src/pages/vehiculos/VehiculosList.tsx
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

interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
}

const VehiculosList: React.FC = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem('vehiculos');
    if (data) {
      setVehiculos(JSON.parse(data));
    }
  }, []);

  const deleteVehiculo = (id: string) => {
    const nuevosVehiculos = vehiculos.filter(v => v.id !== id);
    setVehiculos(nuevosVehiculos);
    localStorage.setItem('vehiculos', JSON.stringify(nuevosVehiculos));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vehículos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton routerLink="/pages/vehiculos/nuevo" expand="block" color="primary">
          Agregar Vehículo
        </IonButton>
        <IonList>
          {vehiculos.map((vehiculo) => (
            <IonItem key={vehiculo.id}>
              <IonLabel>
                <h2>{vehiculo.placa}</h2>
                <p>{vehiculo.marca} - {vehiculo.modelo}</p>
              </IonLabel>
              <IonButton color="secondary" onClick={() => history.push(`/pages/vehiculos/editar/${vehiculo.id}`)}>Editar</IonButton>
              <IonButton color="danger" onClick={() => deleteVehiculo(vehiculo.id)}>Eliminar</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default VehiculosList;
