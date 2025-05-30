import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButton, 
  IonCard, IonIcon, IonItem, IonInput, IonModal, IonLabel
} from '@ionic/react';
import { add, pencil, close, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getCustomers, saveCustomer, deleteCustomer, getCustomerById } from '../../pages/customer/CustomerApi';
import './CustomerList.css';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar clientes al iniciar
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    setCustomers(getCustomers());
  };

  const handleAddCustomer = () => {
    setEditingCustomer({
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: ''
    });
    setIsModalOpen(true);
  };

  const handleEditCustomer = (id: string) => {
    const customer = getCustomerById(id);
    if (customer) {
      setEditingCustomer(customer);
      setIsModalOpen(true);
    }
  };

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      saveCustomer(editingCustomer);
      loadCustomers();
      setIsModalOpen(false);
    }
  };

  const handleRemoveCustomer = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      deleteCustomer(id);
      loadCustomers();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Gestión de Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
            <IonButton onClick={handleAddCustomer} color="primary" fill="solid" slot="end">
              <IonIcon icon={add} slot="start" />
              Agregar Cliente
            </IonButton>
          </IonItem>

          <IonGrid className="customer-table">
            <IonRow className="table-header">
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {customers.map((customer) => (
              <IonRow key={customer.id} className="table-row">
                <IonCol>{customer.firstname} {customer.lastname}</IonCol>
                <IonCol>{customer.email}</IonCol>
                <IonCol>{customer.phone}</IonCol>
                <IonCol>{customer.address}</IonCol>
                <IonCol className="actions-col">
                  <IonButton 
                    color="primary" 
                    fill="clear"
                    onClick={() => handleEditCustomer(customer.id)}
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton 
                    color="danger" 
                    fill="clear"
                    onClick={() => handleRemoveCustomer(customer.id)}
                  >
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>

        {/* Modal para edición/creación */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonContent>
            <IonToolbar>
              <IonTitle>{editingCustomer?.id ? 'Editar Cliente' : 'Nuevo Cliente'}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
            
            {editingCustomer && (
              <div className="ion-padding">
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    value={editingCustomer.firstname}
                    onIonChange={e => setEditingCustomer({...editingCustomer, firstname: e.detail.value!})}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput
                    value={editingCustomer.lastname}
                    onIonChange={e => setEditingCustomer({...editingCustomer, lastname: e.detail.value!})}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    value={editingCustomer.email}
                    onIonChange={e => setEditingCustomer({...editingCustomer, email: e.detail.value!})}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Teléfono</IonLabel>
                  <IonInput
                    value={editingCustomer.phone}
                    onIonChange={e => setEditingCustomer({...editingCustomer, phone: e.detail.value!})}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonInput
                    value={editingCustomer.address}
                    onIonChange={e => setEditingCustomer({...editingCustomer, address: e.detail.value!})}
                  />
                </IonItem>
                
                <IonButton 
                  expand="block" 
                  color="primary" 
                  onClick={handleSaveCustomer}
                  className="ion-margin-top"
                >
                  <IonIcon icon={save} slot="start" />
                  Guardar
                </IonButton>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;