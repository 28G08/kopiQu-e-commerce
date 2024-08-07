//photo
let photoprofile = document.getElementById("profile")
let inputprofile = document.getElementById("input-file")

inputprofile.onchange = function(){
    photoprofile.src = URL.createObjectURL(inputprofile.files[0])
}
