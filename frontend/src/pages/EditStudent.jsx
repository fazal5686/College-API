import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "./AddStudent.css";
import toast from "react-hot-toast";

function EditStudent() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        id:"",
        name:"",
        gender:"",
        age:"",
        class:"",
        email:"",
        phone:"",
        address:"",
        photo:""

    });


    const [photo,setPhoto] = useState(null);

    const [preview,setPreview] = useState(null);

    const [error,setError] = useState("");




    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };





    useEffect(()=>{


        const fetchStudent = async()=>{


            try{


                const token = localStorage.getItem("token");


                const response = await API.get(

                    `/students/${id}`,

                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }

                );


                setFormData(response.data.data);


            }
            catch(error){

                console.log(error);

            }


        };


        fetchStudent();


    },[id]);






    const handleUpdate = async (e) => {

        e.preventDefault();
    
        try {
    
            const token = localStorage.getItem("token");
    
            const data = new FormData();
    
            Object.keys(formData).forEach((key) => {
    
                if (key !== "photo") {
    
                    data.append(
                        key,
                        formData[key]
                    );
    
                }
    
            });
    
            if (photo) {
    
                data.append(
                    "photo",
                    photo
                );
    
            }
    
            await API.put(
    
                `/students/${id}`,
    
                data,
    
                {
                    headers: {
    
                        Authorization: `Bearer ${token}`,
    
                        "Content-Type": "multipart/form-data"
    
                    }
                }
    
            );
            
            setError("");
            toast.success("Student updated successfully");

setTimeout(() => {

    navigate("/dashboard");

}, 1200);
    
        } catch (error) {
    
            console.log(error);
    
            setError(
                error.response?.data?.message ||
                "Update failed"
            );
    
            toast.error(
                error.response?.data?.message ||
                "Update failed"
            );
    
        }
    
    };


return(


<div className="add-page">


<div className="add-card">


<h1>
Edit Student
</h1>


<p className="subtitle">
CollegeAPI Student Update
</p>


<form onSubmit={handleUpdate}>


<div className="form-grid">



<div className="form-group">

<label>
Student ID
</label>

<input

name="id"

value={formData.id}

onChange={handleChange}

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

/>

</div>






<div className="form-group">

<label>
Change Photo
</label>


<input

type="file"

accept="image/*"

onChange={(e)=>{


const file = e.target.files[0];


if(file){

setPhoto(file);

setPreview(
URL.createObjectURL(file)
);

}


}}

/>



{
preview ?

<img
src={preview}
width="100"
height="100"
style={{
borderRadius:"10px",
objectFit:"cover"
}}
/>


:

formData.photo &&

<img
src={`http://localhost:5000/${formData.photo.replace(/\\/g,"/")}`}
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

Update Student

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


export default EditStudent;