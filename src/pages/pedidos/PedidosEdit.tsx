// src/pages/pedidos/PedidosEdit.tsx
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
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

interface Pedido {
  id: string;
  cliente: string;
  repartidor: string;
  vehiculo: string;
  destino: string;
  estado: string;
}

const PedidosEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [pedido, setPedido] = useState<Pedido>({
    id: '',
    cliente: '',
    repartidor: '',
    vehiculo: '',
    destino: '',
    estado: '',
  });

  useEffect(() => {
    if (id) {
      const data = localStorage.getItem('pedidos');
      if (data) {
        const pedidos: Pedido[] = JSON.parse(data);
        const pedidoExistente = pedidos.find(p => p.id === id);
        if (pedidoExistente) {
          setPedido(pedidoExistente);
        }
      }
    }
  }, [id]);

  const handleSave = () => {
    const data = localStorage.getItem('pedidos');
    const pedidos: Pedido[] = data ? JSON.parse(data) : [];

    if (id) {
      // Editar
      const index = pedidos.findIndex(p => p.id === id);
      pedidos[index] = pedido;
    } else {
      // Crear nuevo
      pedido.id = Date.now().toString();
      pedidos.push(pedido);
    }

    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    history.push('/page/pedidos');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{id ? 'Editar Pedido' : 'Nuevo Pedido'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {['cliente', 'repartidor', 'vehiculo', 'destino', 'estado'].map((campo) => (
          <IonItem key={campo}>
            <IonLabel position="stacked">{campo.charAt(0).toUpperCase() + campo.slice(1)}</IonLabel>
            <IonInput
              value={(pedido as any)[campo]}
              onIonChange={(e) => setPedido({ ...pedido, [campo]: e.detail.value! })}
            />
          </IonItem>
        ))}
        <IonButton expand="block" onClick={handleSave}>
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PedidosEdit;

