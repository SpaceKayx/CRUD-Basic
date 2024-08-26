import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createNewStudent, updateStudent, deleteStudent, selectAllStudent } from '../service/StudentService';
import { useRecoilValueLoadable } from 'recoil';
import { getAllStudent } from '../state/rest-state';

const Student = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  // const [listStudent, setListStudent] = useState([]);
  const [student, setStudent] = useState({});

  const listStudent = useRecoilValueLoadable(getAllStudent) // ở rest-state.js
  let {state, contents} = listStudent
  // useEffect(() => {
  //   selectAllStudent()
  //     .then(resp => {
  //       console.log(resp);
  //       setListStudent(resp.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);
  console.log(state);
console.log(contents);

  useEffect(() => {
    if (student) {
      setValue("firstName", student.firstName || '');
      setValue("lastName", student.lastName || '');
      setValue("email", student.email || '');
      setValue("password", student.password || '');
    }
  }, [student, setValue]);

  const createAccount = async (data) => {
    try {
      console.log(data);
      const resp = await createNewStudent(data);
      console.log(resp);
      // Refresh the student list after creating a new student
      const updatedList = await selectAllStudent();
      setListStudent(updatedList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAccount = async (data) => {
    try {
      console.log(data);
      const resp = await updateStudent(student.id, data);
      console.log(resp);
      // Refresh the student list after updating
      const updatedList = await selectAllStudent();
      setListStudent(updatedList.data);
      // Clear student state
      setStudent({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);

      await deleteStudent(id);
      // Refresh the student list after deleting
      const updatedList = await selectAllStudent();
      setListStudent(updatedList.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleEdit(data) {
    setStudent(data);
  }
  if (state === "loading") {
    return <div className="skeleton h-4 w-full"></div>
  }
  else
  return (
    <Container>
      <section className="bg-white">
      
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <input
              value={student?.id}
              {...register("id")}
              hidden
            />
            <form className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  {...register("firstName", { required: "First name is required" })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                  className={`${errors.firstName ? "border border-red-600" : ""} mt-1 w-full p-2 border rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                />
                {errors.firstName && <p className='text-red-600'>{errors.firstName.message}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="lastName"
                  {...register("lastName", { required: "Last Name is Required" })}
                  aria-invalid={errors.lastName ? "true" : "false"}
                  className={`${errors.lastName ? "border border-red-600" : ""} mt-1 w-full p-2 border rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                />
                {errors.lastName && <p className='text-red-600'>{errors.lastName.message}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  {...register("email")}
                  className="mt-1 w-full rounded-md p-2 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  {...register("password")}
                  className="mt-1 w-full p-2 border rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type='button'
                  name='createAccount'
                  onClick={handleSubmit(createAccount)}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create
                </button>
                <button
                  type='button'
                  name='updateAccount'
                  onClick={handleSubmit(updateAccount)}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Update
                </button>
                <button
                  type='button'
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  New
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">No</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">First Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Last Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Password</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              contents?.map((value, index) => (
                <tr className='text-center' key={value.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value.firstName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value.lastName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value.email}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{value.password}</td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <button
                      onClick={() => handleEdit(value)}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(value.id)}
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Student;
