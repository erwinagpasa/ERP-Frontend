import React from 'react'
import Image from 'next/image'

export default function AddForm() {
  return (
    <section className="bg-white">
      <div className="px-4 mx-auto max-w-2xl">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new product</h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">



            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" />
            </div>
            <div className="w-full">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
              <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand" />
            </div>
            <div className="w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                <option>Select category</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div>
              <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900">Item Weight (kg)</label>
              <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="12" />
            </div>



            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Product Image</label>
              <div className="flex items-center gap-4">

                <Image
                  src="/blank.jpg"
                  alt="Picture of the author"
                  width={60}
                  height={60}
                  className="cursor-pointer border-2 border-transparent hover:border-primary-500 image rounded-lg"
                  loading="lazy"
                />

                <Image
                  src="/blank.jpg"
                  alt="Picture of the author"
                  width={60}
                  height={60}
                  className="object-cover  cursor-pointer border-2 border-transparent hover:border-primary-500 image rounded-lg"
                  loading="lazy"
                />

                <Image
                  src="/blank.jpg"
                  alt="Picture of the author"
                  width={60}
                  height={60}
                  className="object-cover  cursor-pointer border-2 border-transparent hover:border-primary-500 image rounded-lg"
                  loading="lazy"
                />

                <Image
                  src="/blank.jpg"
                  alt="Picture of the author"
                  width={60}
                  height={60}
                  className="object-cover  cursor-pointer border-2 border-transparent hover:border-primary-500 image rounded-lg"
                  loading="lazy"
                />

                <Image
                  src="/blank.jpg"
                  alt="Picture of the author"
                  width={60}
                  height={60}
                  className="object-cover  cursor-pointer border-2 border-transparent hover:border-primary-500 image rounded-lg"
                  loading="lazy"
                />

                <label htmlFor="dropzone-file" className="flex items-center h-[65px] w-[65px] border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center w-full">
                    <svg className="w-4 h-4 mb-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="text-xs text-gray-500">Upload</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
