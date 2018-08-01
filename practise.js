
let movieTitle;
let movieYear;
let movieimdbID;

$(document).ready(() => {

    $('#submit').click(()=>{
movieTitle=document.getElementById("title").value;
movieYear=document.getElementById("year").value;
movieimdbID=document.getElementById("imdb").value;


if(movieTitle!="" && movieYear!="")
{
    getDetailbyTitle(movieTitle,movieYear);
}
else if(movieTitle!="" && movieYear=="")
{
    getDetailbyTitle(movieTitle,movieYear);
}
else if(movieTitle=="" && movieYear!="")
{
    alert("Information is not available!");
    
}
else if(movieimdbID!="")
{
    getDetailbyTitle(movieimdbID);
}
         else
         {
            alert("Please give the Input!!")
         }

    });

   });
  
let getDetailbyTitle = (movieTitle,movieYear,movieimdbID) => {

    console.log("making request")

    $.ajax({
        type: 'GET', 
        dataType: 'json', 
        async:true,
        url:'https://www.omdbapi.com/?t='+movieTitle+'&y='+movieYear+'&i='+movieimdbID+'&apikey=7d98e1a5', // URL of getting data
        success: (data) => { 
            
          let response = data.Response;
            console.log("Response Returned: " + response);
            let responseData;

            if (response == "True") {

                let poster;

                if (data.Poster != "N/A")
                    poster = data.Poster;
                else
                    poster = "sorry.jpg";


                responseData = `
                        <tr><td colspan="2" style="text-align: center;"><img src="${poster}" height="300px"></td></tr>
                        <tr><td><b>Title</td><td><b>${data.Title}</td></tr>
                        <tr><td><b>Year</td><td><b>${data.Year}</td></tr>
                        <tr><td><b>imdbID</td><td><b>${data.imdbID}</td></tr>
                        <tr><td><b>Rated</td><td><b>${data.Rated}</td></tr>
                        <tr><td><b>Released</td><td><b>${data.Released}</td></tr>
                        <tr><td><b>Runtime</td><td><b>${data.Runtime}</td></tr>
                        <tr><td><b>Genre</td><td><b>${data.Genre}</td></tr>
                        <tr><td><b>Director</td><td><b>${data.Director}</td></tr>
                        <tr><td><b>Actors</td><td><b>${data.Actors}</td></tr>
                        <tr><td><b>imdbRating</td><td><b>${data.imdbRating}</td></tr>
                        <tr><td><b>Plot</td><td><b>${data.Plot}</td></tr>`;
            }
             else if (response == "False") {
                responseData = `<tr><td colspan="3" style="text-align: center;">Sorry No Result Found</td></tr>`;
            }


            $("#infoTable").html(responseData);


},
        error: (data) => { // in case of error response

            alert("some error occured")

        },

        beforeSend: () => { // while request is processing.

            // you can use loader here.
           

        },
        complete: () => {

            // what you want to do while request is completed
          

        },

        timeout:3000 // this is in milli seconds

    }); // end of AJAX request
}
