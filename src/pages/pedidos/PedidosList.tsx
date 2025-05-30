// src/pages/pedidos/PedidosList.tsx
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

interface Pedido {
  id: string;
  cliente: string;
  repartidor: string;
  vehiculo: string;
  destino: string;
  estado: string;
}

const PedidosList: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem('pedidos');
    if (data) {
      setPedidos(JSON.parse(data));
    }
  }, []);

  const deletePedido = (id: string) => {
    const nuevosPedidos = pedidos.filter(p => p.id !== id);
    setPedidos(nuevosPedidos);
    localStorage.setItem('pedidos', JSON.stringify(nuevosPedidos));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton routerLink="/page/pedidos/nuevo" expand="block" color="primary">
          Agregar Pedido
        </IonButton>
        <IonList>
          {pedidos.map((pedido) => (
            <IonItem key={pedido.id}>
              <IonLabel>
                <h2>{pedido.cliente} → {pedido.destino}</h2>
                <p>Repartidor: {pedido.repartidor} | Vehículo: {pedido.vehiculo} | Estado: {pedido.estado}</p>
              </IonLabel>
              <IonButton color="secondary" onClick={() => history.push(`/page/pedidos/editar/${pedido.id}`)}>Editar</IonButton>
              <IonButton color="danger" onClick={() => deletePedido(pedido.id)}>Eliminar</IonButton>
              <IonButton color="medium" onClick={() => history.push(`/page/pedidos/ver/${pedido.id}`)}>Ver</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PedidosList;
