import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import CustomerList from './pages/customer/CustomerList';
import VehiculosList from './pages/vehiculos/VehiculosList';
import VehiculoEdit from './pages//vehiculos/VehiculoEdit';

import DeliveryList from './pages/repartidores/DeliveryList';
import DeliveryEdit from './pages/repartidores/DeliveryEdit';


 import PedidosList from './pages/pedidos/PedidosList';
import PedidosEdit from './pages/pedidos/PedidosEdit';
import PedidosDetail from './pages/pedidos/PedidosDetail';
setupIonicReact();


const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact>
              <Redirect to="/page/customers" />
            </Route>
            
           <Route path="/page/customers" exact>
        <CustomerList name="Clientes" />
            </Route>


<Route path="/page/repartidores" component={DeliveryList} exact />
            <Route path="/pages/repartidores/nuevo" component={DeliveryEdit} />
            <Route path="/pages/repartidores/editar/:id" component={DeliveryEdit} />
            

<Route path="/page/vehiculos" component={VehiculosList} exact />
<Route path="/pages/vehiculos/nuevo" component={VehiculoEdit} />
<Route path="/pages/vehiculos/editar/:id" component={VehiculoEdit} />
   
<Route path="/page/pedidos" component={PedidosList} exact />
<Route path="/page/pedidos/nuevo" component={PedidosEdit} exact />
<Route path="/page/pedidos/editar/:id" component={PedidosEdit} exact />
<Route path="/page/pedidos/ver/:id" component={PedidosDetail} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
