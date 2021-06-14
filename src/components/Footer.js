import React from "react";

function Footer() {
  return (
    <footer className="relative w-full pt-1 bg-white footer">
      <div className="container px-3 mx-auto md:px-6">
        <div className="sm:flex sm:mt-8">
          <div className="flex flex-col justify-between mt-8 sm:mt-0 sm:w-full sm:px-8 md:flex-row">
            <div className="flex flex-col">
              <span className="mb-2 font-bold text-gray-700 uppercase">
                Бидний тухай
              </span>
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Үйлчилгээний нөхцөл
                </a>
              </span>
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Нууцлалын бодлого
                </a>
              </span>
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Холбоо барих
                </a>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="mt-4 mb-2 font-bold text-gray-700 uppercase md:mt-0">
                Заавар
              </span>
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Хэрхэн хандив өгөх вэ ?
                </a>
              </span>
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Дусал гэж юу вэ?
                </a>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Төслүүд
                </a>
              </span>
              <span className="my-2">
                <a
                  href="#"
                  className="text-blue-700 text-md hover:text-blue-500"
                >
                  Мэдээ
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center mt-16 border-t-2 border-gray-300">
          <div className="py-6 text-center sm:w-2/3">
            <p className="mb-2 text-sm font-bold text-blue-700">© 2021 Dusal</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
