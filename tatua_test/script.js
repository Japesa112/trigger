
// Define the data you want to send in the POST request
function insert(postData){

    // Fetch API POST request
    fetch("https://tatua.onrender.com/tatuas", {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData), // Convert JavaScript object to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("New tatua created:", data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
    
  
  
  }
  
  
  
    function getAll(){
      fetch('https://tatua.onrender.com/tatuas')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      console.log('All Tatuas:', data);
      // You can perform further operations with the data here
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  
    }
  
   
    function getLastID() {
      return new Promise((resolve, reject) => {
        fetch('https://tatua.onrender.com/tatuas')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
          })
          .then(data => {
            // Check if the response data is an array and it's not empty
            if (Array.isArray(data) && data.length > 0) {
              // Access the last element's ID
              const lastElementId = data[data.length - 1].id;
              resolve(lastElementId); // Resolve the promise with the last element's ID
            } else {
              reject('No data received or data is not an array'); // Reject if no data or data is not an array
            }
          })
          .catch(error => {
            reject(`There was a problem with your fetch operation: ${error}`); // Reject with the error message
          });
      });
    }
  
    function generateNumbers() {
      // Generate three random numbers between 1 and 10
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const num3 = Math.floor(Math.random() * 10) + 1;
  
      // Return the numbers in the specified format
      return `${num1}-${num2}-${num3}`;
  }
    
    // Define a function to execute the block
  function executeBlock() {
      getLastID()
        .then(lastID => {
          lastID = lastID + 1;
          const postData = {
            id: lastID,
            winSequence: generateNumbers(),
          };
          insert(postData)
          console.log(lastID); // Log the value of id inside the .then() block
        })
        .catch(error => {
          console.error(error);
        });
    }
    
    // Call the function immediately to execute it once
    executeBlock();
    
    // Set interval to repeat the block every 5 minutes
    setInterval(executeBlock, 5 * 60 * 1000); // 5 minutes * 60 seconds * 1000 milliseconds
    
  
     
    
    