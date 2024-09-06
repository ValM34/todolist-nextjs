import { useState, useRef, useEffect } from "react";
import MainLayout from "../../components/layouts/mainLayout";
import { updateUser, getUser } from "../services/users";

export default function Profil() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<{
    firstName: string | null;
    lastName: string | null;
  }>({
    firstName: null,
    lastName: null,
  });

  useEffect(() => {
    async function loadUser() {
      const userData = await getUser();
      if(!userData) return;
      if(user.firstName || user.lastName) return;
      setUser(userData.data);
    }
    loadUser();
  }, [user]);
  
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if(
      firstNameRef.current?.value === undefined ||
      lastNameRef.current?.value === undefined
    ) {
      return;
    }
    const firstName = firstNameRef.current?.value === '' ? null : firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value === '' ? null : lastNameRef.current?.value;
    const user = { firstName, lastName };
    await updateUser(user);
  }

  return (
    <MainLayout>
      <form className="w-60 mx-auto border-2 border-gray-300 p-4 rounded-xl">
        <h2 className="font-semibold text-xl mb-4">Profile</h2>
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Prénom
          </label>
          <input
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="firstName"
            name="firstName"
            type="text"
            ref={firstNameRef}
            defaultValue={user.firstName ?? ""}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nom
          </label>
          <input
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="lastName"
            name="lastName"
            type="text"
            ref={lastNameRef}
            defaultValue={user.lastName ?? ""}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            onClick={handleUpdateUser}
          >
            Ajouter
          </button>
        </div>
      </form>
    </MainLayout>
  );
}