import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonAlert,
  IonLoading
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
}

const VehiculoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [vehiculo, setVehiculo] = useState<Vehiculo>({ 
    id: '', 
    placa: '', 
    marca: '', 
    modelo: '' 
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Cargar datos del vehículo si estamos editando
  useEffect(() => {
    if (id) {
      setLoading(true);
      const vehiculos = JSON.parse(localStorage.getItem('vehiculos') || '[]');
      const vehiculoExistente = vehiculos.find((v: Vehiculo) => v.id === id);
      
      if (vehiculoExistente) {
        setVehiculo(vehiculoExistente);
      } else {
        setAlertMessage('Vehículo no encontrado');
        setShowAlert(true);
      }
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = () => {
    if (!vehiculo.placa || !vehiculo.marca || !vehiculo.modelo) {
      setAlertMessage('Todos los campos son requeridos');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    
    try {
      const vehiculos = JSON.parse(localStorage.getItem('vehiculos') || '[]');
      let vehiculosActualizados = [];

      if (id) {
        // Modo edición
        vehiculosActualizados = vehiculos.map((v: Vehiculo) => 
          v.id === id ? vehiculo : v
        );
      } else {
        // Modo creación
        const nuevoVehiculo = {
          ...vehiculo,
          id: Date.now().toString()
        };
        vehiculosActualizados = [...vehiculos, nuevoVehiculo];
      }

      localStorage.setItem('vehiculos', JSON.stringify(vehiculosActualizados));
      history.push('/page/vehiculos');
    } catch (error) {
      setAlertMessage('Error al guardar el vehículo');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/vehiculos" />
          </IonButtons>
          <IonTitle>{id ? 'Editar Vehículo' : 'Nuevo Vehículo'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Placa*</IonLabel>
          <IonInput 
            value={vehiculo.placa} 
            onIonChange={(e) => setVehiculo({ ...vehiculo, placa: e.detail.value! })} 
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Marca*</IonLabel>
          <IonInput 
            value={vehiculo.marca} 
            onIonChange={(e) => setVehiculo({ ...vehiculo, marca: e.detail.value! })}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Modelo*</IonLabel>
          <IonInput 
            value={vehiculo.modelo} 
            onIonChange={(e) => setVehiculo({ ...vehiculo, modelo: e.detail.value! })}
            required
          />
        </IonItem>
        
        <IonButton 
          expand="block" 
          onClick={handleSubmit} 
          className="ion-margin-top"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </IonButton>

        <IonLoading isOpen={loading} message="Por favor espere..." />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default VehiculoEdit;