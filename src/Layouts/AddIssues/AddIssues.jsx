// import React, { use } from 'react'
// import { AuthContext } from '../../Context/AuthContext';
import useAuth from '../../Hooks/useAuth';

 

const AddIssues = () => {

  const {user } = useAuth();

 console.log(user)

    const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.image.value,
      created_at: new Date(),
      booking: 0,
      providerEmail: user.email,
      location:e.target.location.value,
      repoted_by:e.target.reported_by.value,
      resolve_bugget:e.target.resolve_bugget.value,
      status: "Pending",

    }   
     console.log(formData)
    //  console.log(providerEmail)

     fetch(`https://public-infrastructure-system-server.vercel.app/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    .then(res => res.json())
    .then(data=> {
      
      console.log(data,"Successfully added!")
    })
    .catch(error => {
      console.log(error)
    })

  }

  return (
   <div className="card border my-20 border-orange-200 bg-orange-100 w-full max-w-xl mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Issues</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="label font-medium">Issue Title</label>
            <input
              type="text"
              name="title"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

         
          <div>
            <label className="label font-medium">Category</label>
            <select
              // defaultValue={""}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Garbage">Garbage</option>
              <option value="Illigal Construction">Illigal Construction</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Broken Public Property">Broken Public Property</option>
              <option value="Electric Issue">Electric Issue</option>
            </select>
          </div>

          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Location"
            />
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[180px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className='flex gap-4 flex-3'>
            <div className='w-lg'>
            <label className="label font-medium">Reported by </label>
            <input
              type="text"
              name="reported_by"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="label font-medium">Resolve Bugget</label>
            <input
              type="number"
              name="resolve_bugget"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Amount"
            />
          </div>

          </div>


          <div>
            <label className="label font-medium">Provider Email</label>
            <input
              type="email"
              name="providerEmail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              // placeholder={user?.email}
              value={user?.email} readOnly
            />
          </div>

          
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-orange-500 to-amber-800 hover:from-pink-600 hover:to-red-700"
          >
            Add Issue
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddIssues
