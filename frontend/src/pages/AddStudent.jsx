import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./AddStudent.css";
import toast from "react-hot-toast";

function AddStudent(){


    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        id:"",
        name:"",
        gender:"",
        age:"",
        class:"",
        email:"",
        phone:"",
        address:""

    });


    const [photo, setPhoto] = useState(null);
const [preview, setPreview] = useState(null);
    {
        formData.photo && !photo &&
        
        <img
        src={`http://localhost:5000/${formData.photo.replace(/\\/g,"/")}`}
        width="100"
        />
        
        }

    const [error,setError] = useState("");





    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };






    const handleSubmit = async(e)=>{


        e.preventDefault();


        try{


            const token =
            localStorage.getItem("token");



            const data = new FormData();


            Object.keys(formData).forEach((key)=>{

                data.append(
                    key,
                    formData[key]
                );

            });



            if(photo){

                data.append(
                    "photo",
                    photo
                );

            }




            await API.post(

                "/students",

                data,

                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`,

                        "Content-Type":
                        "multipart/form-data"
                    }
                }

            );



            toast.success("Student added successfully");

            navigate("/dashboard");

        }
        catch (error) {

            console.log("FULL ERROR:", error.response?.data);
        
            const message =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                "Failed to add student";
        
            setError(message);
        
            toast.error(message);
        
        }


    };

    return(


<div className="add-page">



<div className="add-card">



<h1>
Add New Student
</h1>


<p className="subtitle">
CollegeAPI Student Registration
</p>





<form onSubmit={handleSubmit}>




<div className="form-grid">



<div className="form-group">

<label>
Student ID
</label>

<input

name="id"

value={formData.id}

onChange={handleChange}

placeholder="Enter ID"

/>

</div>





<div className="form-group">

<label>
Name
</label>

<input

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Enter name"

/>

</div>





<div className="form-group">

<label>
Gender
</label>


<select

name="gender"

value={formData.gender}

onChange={handleChange}

>

<option value="">
Select Gender
</option>


<option value="Male">
Male
</option>


<option value="Female">
Female
</option>


</select>


</div>





<div className="form-group">

<label>
Age
</label>

<input

type="number"

name="age"

value={formData.age}

onChange={handleChange}

placeholder="Age"

/>

</div>






<div className="form-group">

<label>
Class
</label>

<input

name="class"

value={formData.class}

onChange={handleChange}

placeholder="Class"

/>

</div>






<div className="form-group">

<label>
Email
</label>

<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Email"

/>

</div>






<div className="form-group">

<label>
Phone
</label>

<input

name="phone"

value={formData.phone}

onChange={handleChange}

placeholder="Phone"

/>

</div>

<div className="form-group">

<label>
Photo
</label>


<input

type="file"

accept="image/*"

onChange={(e)=>{

    const file = e.target.files[0];
    
    setPhoto(file);
    
    setPreview(URL.createObjectURL(file));
    
    }}
/>

{
preview &&

<img
src={preview}
width="100"
height="100"
style={{
borderRadius:"10px",
objectFit:"cover"
}}
/>

}

</div>





</div>





<div className="form-group address">


<label>
Address
</label>


<textarea

name="address"

value={formData.address}

onChange={handleChange}

placeholder="Enter address"

/>


</div>







{
error &&

<p className="form-error">

{error}

</p>

}





<div className="form-buttons">


<button

type="submit"

className="save-btn"

>

Save Student

</button>





<button

type="button"

className="cancel-btn"

onClick={()=>navigate("/dashboard")}

>

Cancel

</button>



</div>





</form>



</div>



</div>


    );


}


export default AddStudent;