// src/pages/pedidos/PedidosDetail.tsx
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
import { useParams, useHistory } from 'react-router';

interface Pedido {
  id: string;
  cliente: string;
  repartidor: string;
  vehiculo: string;
  destino: string;
  estado: string;
}

const PedidosDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('pedidos');
    if (data) {
      const pedidos: Pedido[] = JSON.parse(data);
      const encontrado = pedidos.find(p => p.id === id);
      setPedido(encontrado || null);
    }
  }, [id]);

  if (!pedido) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pedido no encontrado</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No se encontró el pedido con ID: {id}</p>
          <IonButton onClick={() => history.push('/page/pedidos')}>Volver</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle del Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {Object.entries(pedido).map(([key, value]) => (
            <IonItem key={key}>
              <IonLabel><strong>{key}:</strong> {value}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" onClick={() => history.push('/page/pedidos')}>
          Volver a la lista
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PedidosDetail;
