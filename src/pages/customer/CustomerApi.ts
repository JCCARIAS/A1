// src/api/customerApi.ts

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

const STORAGE_KEY = 'customer_app_data';

// Obtener clientes desde localStorage
export function getCustomers(): Customer[] {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
}

// Guardar clientes en localStorage
function saveCustomers(customers: Customer[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

// Buscar cliente por ID
export function getCustomerById(id: string): Customer | undefined {
  const customers = getCustomers();
  return customers.find(customer => customer.id === id);
}

// Guardar o actualizar cliente
export function saveCustomer(customer: Customer): Customer {
  const customers = getCustomers();
  const existingIndex = customers.findIndex(c => c.id === customer.id);

  if (existingIndex >= 0) {
    customers[existingIndex] = customer; // Actualizar
  } else {
    // Crear nuevo con ID autoincremental
    const newId = customers.length > 0 
      ? Math.max(...customers.map(c => parseInt(c.id))) + 1 
      : 1;
    customer.id = newId.toString();
    customers.push(customer);
  }

  saveCustomers(customers);
  return customer;
}

// Eliminar cliente
export function deleteCustomer(id: string): boolean {
  const customers = getCustomers();
  const newCustomers = customers.filter(customer => customer.id !== id);
  const wasDeleted = newCustomers.length < customers.length;
  
  if (wasDeleted) {
    saveCustomers(newCustomers);
  }
  
  return wasDeleted;
}