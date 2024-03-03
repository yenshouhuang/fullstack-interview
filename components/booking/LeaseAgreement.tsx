import React from 'react'

const LeaseAgreement = () => {
  return (
    <div id="lease">
      <head>
        <title>Lease Agreement</title>
    
      </head>
      <body className="bg-gray-50 p-8">
      <head>
        <title>Lease Agreement</title>
      </head>
      <body className="bg-white font-sans leading-normal tracking-normal">
          <div className="container mx-auto my-8">
              <div className="w-full text-center mb-8">
                  <h1 className="text-3xl font-bold">LEASE AGREEMENT</h1>
              </div>
              
              <p>This Lease Agreement (this “Agreement”) made by and between:</p>
              
              <div className="my-4">
                  <p><strong>Landlord:</strong> _______________________ (“Landlord”) AND</p>
                  <p><strong>Tenant(s):</strong> _________________________________________________________ (“Tenant”).</p>
                  <p>In the event there is more than one Tenant, each reference to “Tenant” shall apply to each of them, jointly and severally. Each tenant is jointly and severally liable to the landlord for payment of rent and performance in accordance with all other terms of this Agreement. Each Landlord and Tenant may be referred to individually as a “Party” and collectively as the “Parties.”</p>
              </div>

              <p><strong>1. Premises.</strong> The premises leased is an apartment located at _______________, City of _______________, State of _______________, _______________ (“Premises”).</p>

              <p><strong>2. Agreement to Lease.</strong> Landlord agrees to lease to Tenant and Tenant agrees to lease from Landlord, subject to the terms and conditions set forth herein, the Premises.</p>

              <p><strong>3. Term.</strong> This Agreement shall commence on: (check one)</p>
              <p>☐ Fixed Lease. This Agreement will be for a term beginning on _____________ and ending on _____________ (the “Term”).</p>

              <p><strong>4. Rent.</strong> Tenant will pay Landlord a monthly rent of $__________ for the Term. Rent will be payable in advance and due on the first day of each month during the Term. The first rent payment is payable to Landlord when Tenant signs this Agreement.</p>

              <div className="flex justify-center my-8">
                  <div className="mr-8">
                      <p><strong>Landlord Signature</strong></p>
                      <p>________________________</p>
                      <p><strong>Landlord Full Name</strong></p>
                  </div>
                  
                  <div>
                      <p><strong>Tenant Signature</strong></p>
                      <p>________________________</p>
                      <p><strong>Tenant Full Name</strong></p>
                  </div>
              </div>
          </div>
      </body> 
      </body>
      </div>
  )
}

export default LeaseAgreement
