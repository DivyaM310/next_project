"use client"
import React, { useState, useEffect, FormEvent } from "react";
import { db } from './firebaseconf';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import './globals.css';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

interface Employee {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email:string;
  experience: string;
}

async function addData(name: string, surname: string, phone: string,email:string, experience: string): Promise<boolean> {
  try {
    
    const docRef = await addDoc(collection(db, "employee"), {
      
      name: name,
      surname: surname,
      phone: parseInt(phone),
      email:email,
      experience: experience,
    });
    console.log("Document written with docId: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

async function fetchEmployees(): Promise<Employee[]> {
  const employeesCollection = collection(db, 'employee');
  const employeesSnapshot = await getDocs(employeesCollection);
  const employeesData: Employee[] = [];
  employeesSnapshot.forEach((doc) => {
    const employeeData = doc.data() as Employee;
    employeesData.push({ id: doc.id, name: employeeData.name, surname: employeeData.surname, phone: employeeData.phone,email:employeeData.email, experience: employeeData.experience });
  });
  return employeesData;
}

export default function Home(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string>(""); // Add this line to declare editingEmployeeId state variable


  useEffect(() => {
    const fetchEmployeesData = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    fetchEmployeesData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const added = await addData(name, surname, phone,email, experience);
    if (added) {
      setName("");
      setSurname("");
      setPhone("");
      setemail("");
      setExperience("");
      alert("Data added to Firestore");
      const updatedEmployees = await fetchEmployees();
      setEmployees(updatedEmployees);
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "employee", id)); // Using deleteDoc function to delete document from Firestore
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleEdit = async (employee: Employee) => {
    setEditingEmployeeId(employee.id);
    setName(employee.name);
    setSurname(employee.surname);
    setPhone(employee.phone);
    setemail(employee.email)
    setExperience(employee.experience);
  };

  const handleUpdate = async (): Promise<void> => {
    await updateDoc(doc(db, "employee", editingEmployeeId), {
      name: name,
      surname: surname,
      phone: parseInt(phone),
      email:email,
      experience: experience
    });
    setName("");
    setSurname("");
    setPhone("");
    setemail("");
    setExperience("");
    setEditingEmployeeId("");
    const updatedEmployees = await fetchEmployees();
    setEmployees(updatedEmployees);
  };

 
  return (
    <main>
      <div className="container justify-center">
        <h2>EMPLOYEE DETAILS</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto ">
          <div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="surname"
                value={surname}
                required
                onChange={(e) => setSurname(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                placeholder="phone Number"
                required
                pattern="[0-9]{3}[-. /]?[0-9]{3}[-. /]?[0-9]{4}" // Example pattern for xxx-xxx-xxxx format
               
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email Adrress"
                value={email}
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Email is not valid"
                onChange={(e) => setemail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="experience">Experience:</label>
              <input
                type="text"
                name="experience"
                id="experience"
                value={experience}
                placeholder="experience"
                required
                
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="rounded-lg bg-blue-950 p-3 text-white hover:bg-blue-600"
                value="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
<div className="container justify-center">
        <Table aria-label="Employee Table" className="w-full max-w-2xl mx-auto">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Surname</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Experience</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.surname}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.experience}</TableCell>
                <TableCell>
                  {editingEmployeeId === employee.id ? (
                    <button  className="rounded-lg bg-blue-950 p-2 text-white hover:bg-blue-600" onClick={handleUpdate}>Update</button>
                  ) : (
                    <button  className="rounded-lg bg-blue-950 p-2 text-white hover:bg-blue-600" onClick={() => handleEdit(employee)}>Edit</button>
                  )}
                </TableCell>
                <TableCell>
                  <button  className="rounded-lg bg-blue-950 p-2 text-white hover:bg-blue-600" onClick={() => handleDelete(employee.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
