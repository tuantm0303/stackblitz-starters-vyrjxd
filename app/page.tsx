"use client";
import { userType } from "@/models/users";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<userType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const itemOnePage = 10;

  useEffect(() => {
    const getData = async () => {
      const { users } = await (await fetch("https://dummyjson.com/users")).json();
      setData(users);
    };
    getData();
  }, []);
  useEffect(() => {
    console.log(user);

    if (currentId !== null) {
      const getUser = async (currentId: number | any) => {
        const res = await (await fetch(`https://dummyjson.com/users/${currentId}`)).json();
        setUser(res);
      };
      getUser(currentId);
    }
  }, [currentId]);

  // pagination
  const startIndex = (currentPage - 1) * itemOnePage;
  const endIndex = currentPage * itemOnePage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemOnePage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleClick = (id: number) => {
    setCurrentId(id);
  };
  return (
    <main className="py-5">
      {/* render table */}
      <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-800 text-gray-200">
        <tbody>
          <tr className="text-left border-b border-gray-300">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Company Name</th>
            <th className="px-4 py-3">Department</th>
          </tr>
          {currentData?.map((item: userType, index: number) => {
            return (
              <tr
                className="bg-gray-700 border-b border-gray-600 hover:bg-gray-400"
                key={startIndex + index}
                onClick={() => handleClick(item?.id)}>
                <td className="px-4 py-3">{item?.id}</td>
                <td className="px-4 py-3 font-semibold">{`${item?.firstName} ${item?.lastName}`}</td>
                <td className="px-4 py-3 hover:underline">{item?.email}</td>
                <td className="px-4 py-3">{item?.company?.name}</td>
                <td className="px-4 py-3">{item?.company?.department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="flex justify-center">
        <button
          className="border border-blue-gray-100 text-sm rounded-xl w-20 mx-2 hover:pointer hover:bg-pink-500"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <p
            key={index + 1}
            className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 ${
              currentPage === index + 1 ? "bg-pink-500 text-white shadow-md" : "bg-transparent text-blue-gray-500"
            } p-0 text-sm transition duration-150 ease-in-out hover:bg-light-300`}
            onClick={() => goToPage(index + 1)}>
            {index + 1}
          </p>
        ))}
        <button
          className="border border-blue-gray-100 text-sm rounded-xl w-20 mx-2 hover:pointer hover:bg-pink-500"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </ul>

      {/* render user */}
      {(user !== null && (
        <div className="flex justify-evenly items-center w-5/6 mx-auto py-10">
          <div className="flex flex-col">
            <img src={user?.image} alt={`${user?.firstName} ${user?.lastName}`} />
            <div className="text-center text-xl font-semibold">
              <h1 className="py-2">
                Full Name: {user?.firstName} {user?.lastName}
              </h1>
              <p>Age: {user?.age}</p>
            </div>
          </div>
          <div className="w-1/4">
            <p className="py-2">Email: {user?.email}</p>
            <p className="py-2">
              Address: {user?.address?.address} {user?.address?.city}
            </p>
            <div className="flex justify-between items-center">
              <div className="menu relative">
                <button className="flex bg-gray-800 items-center justify-between px-3 py-2 w-full border border-gray-500 rounded-lg">
                  Card Blog
                </button>
                <ul className="menu-item bg-gray-800 absolute mb-4 rounded-lg shadow-lg">
                  <li className="px-10 py-2 transition-colors duration-300 hover:bg-gray-400">
                    Card Number: {user?.bank?.cardNumber}
                  </li>
                  <li className="px-10 py-2 transition-colors duration-300 hover:bg-gray-400">
                    Card Type: {user?.bank?.cardType}
                  </li>
                  <li className="px-10 py-2 transition-colors duration-300 hover:bg-gray-400">
                    Card Expire: {user?.bank?.cardExpire}
                  </li>
                </ul>
              </div>
              <div className="menu relative py-2">
                <button className="flex bg-gray-800 items-center justify-between px-3 py-2 w-full border border-gray-500 rounded-lg">
                  Company Blog
                </button>
                <ul className="menu-item bg-gray-800 absolute mb-4 rounded-lg shadow-lg right-0 left-[-130px]">
                  <li className="px-10 py-2 transition-colors duration-300 hover:bg-gray-400">
                    Company Name: {user?.company?.name}
                  </li>
                  <li className="px-10 py-2 transition-colors duration-300 hover:bg-gray-400">
                    Company Address: {user?.company?.address?.address}
                  </li>
                  <li className="px-10 py-2 transition-colors duration-300 hover:bg-gray-400">
                    Department: {user?.company?.department}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )) ||
        null}
    </main>
  );
}
