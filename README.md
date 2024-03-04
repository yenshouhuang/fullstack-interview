# Habyt Fullstack Interview Project


## Getting Started
- Clone the Repository: `git clone [repo-link]`
- Install Dependencies: Run `npm install` or `yarn install` in the project directory.
- Start the Development Server: Execute `npm run dev` or `yarn dev`.


## Features

1. Home Listing

	- Explore listings with visuals and important details loaded from ILS feed. Limited to 10 listings.
	- Home page will render first with Hero image. When the home listings are still loading, a loading image will be shown. 

	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/home_listing.png?raw=true)
	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/home_listing_loading.png?raw=true)

2. View More and Book
	
	- When hover to the house listing, "View more and Book" button will show.  

	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/view_more.png?raw=true)

3. House Details

	
	- Get detailed information including bedrooms, availability dates, and more. "houseId" included in the path
	- View and interact with house images directly. Image URL included in the path.
	- Book Button at the end of the Dialog.


	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/house_details.png?raw=true)
	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/house_image.png?raw=true)

4. Booking Process - Background Info

	- Begin booking process by providing essential background information.
	- All fields are required. If not entering all information, an alert will show up. 

	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/background_info.png?raw=true)

5. Booking Process - Room Details

	- Select room details with Property Name, Address, and Earliest Available Date shown.
	- When select Lease Term, Monthly Rent will be caculated dynamically.
	- When select Start Date, date must on the same date or later than Earliest Available Date.
	- End Date will be automatically populated based on Lease Term and Start Date.

	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/room_details.png?raw=true)

6. Booking Process - Lease Agreement and Signature

	- Review and sign the lease agreement digitally to proceed with booking.
	- All previous entered information will populate on lease agreement, include Name, Address, Lease Term, Rent. 
	- Signature pad will be used for generating signature. 
	- After hitting the save button, signature will appear on lease agreement. Clear signature allows user to clear current signature and create a new one. 
	
	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/lease_agreement.png?raw=true)
	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/signature.png?raw=true)

7. Booking Process - Welcome View

	- Welcome screen post-booking confirmation.

	![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/welcome_view.png?raw=true)
	
8. Backend Simulation 

	- Simulate backend interactions for a full-fledged experience.

![alt text](https://github.com/yenshouhuang/fullstack-interview/blob/main/public/Readme/backend_simulation.png?raw=true)




## Improvements

- Use session management to store relevant data and embedd information into the URL as route parameters
	- This approach ensures that, upon refreshing the page, the application can retrieve and display the exact state or page the user was last interacting with. By implementing this feature, we not only enhance the user's experience by providing a seamless continuation of their session but also mitigate the potential frustration associated with losing progress due to page reloads. This method of state preservation via session storage and route parameters serves as a robust solution to maintain the application's state across refreshes, thereby improving overall usability and user satisfaction.



