navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
});


let judul;
let body;
let data = [];

const runSpeechRecognition = ()=>{
    const output = document.getElementById("output");
    const action = document.getElementById("action");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    console.log(SpeechRecognition);
    recognition.onstart = function() {
                    
        handleMicIsActive(true)
    };
    recognition.onspeechend = function() {
        handleMicIsActive(false);
        recognition.stop();

    }
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        //var confidence = event.results[0][0].confidence;

        
         
        body = transcript;

        //output.innerHTML = " <b>Soal ke </b> " + a +  " | Yang diucapkan " +transcript + " | Keterangan = " + hasil + "<br> Menjawab Benar : " + jb + "<br>Jumlah Salah : " + js;
        output.innerHTML = transcript;
        // a = a + 1;
        
        
    };
    recognition.lang ='id-ID';
    recognition.start();
}
const handleMicIsActive = (isActive)=>{
    const mic = document.getElementById('mic');
    mic.innerHTML = '';
    if(isActive){
       return mic.innerHTML = `<img src="./asset/mic-green.svg" alt="" id="action"/>`;
    }
    if(!isActive){
       return mic.innerHTML = `<img src="./asset/mic-red.svg" alt="" id="action">`
    }
}
const handleInput = () =>{
    const title = document.getElementById('title').value;
    judul = title;
}
const handleSave = () =>{
    const title = document.getElementById('title').value;
    const output = document.getElementById("output");
    
    let newObj = {
        id: new Date().getTime(),
        title: judul,
        body:  body,
        date:{
            day: new Date().getDay(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        }
    }
    
    data.push(newObj);
    setTimeout(()=>{
       handleChange(); 
    },[500]);
    console.log('save data success');
    alert('save data success')
    output.innerHTML = '';
}
const handleReset = () =>{
    const output = document.getElementById("output");
    output.innerHTML = '';
}
const handleChange = () =>{
    localStorage.setItem('notes',JSON.stringify(data));
    handleSetContainer(data)
}
const handleSetContainer = (data) =>{
    const container = document.getElementById('container');
    container.innerHTML = '';
        data.forEach(note => {
           container.innerHTML += cardNote(note.title, note.body,note.date,note.id); 
        });
    
}
const handleRemove = (id)=>{
    const noteid = id.toString();
    const newdata = data.filter(note => note.id != noteid);
    data = newdata;
    console.log(data)
    handleChange();
}
const cardNote = (judul,body,date,id) =>{
    let tgl = {
        day: date.day,
        month: date.month,
        year: date.year,
        hour: date.hour,
        minute: date.minute
    }
    return `<div class="card">
        <div class="note-title">
            ${judul}
        </div>
        <div class="note-date">
            ${tgl.hour}:${tgl.minute}  ${tgl.day}/${tgl.month}/${tgl.year}
        </div>
        <div class="note-body">
            <p>
                ${body}
            </p>
        </div>
        <button class="btn-remove" value="${id}" onclick="handleRemove(value)">
            <img src="./asset/trash-icon.svg" alt="">
            Remove
        </button>
     </div>`
}
const getDataNotes = () =>{
    let notes =JSON.parse(localStorage.getItem('notes'));
    if(notes === null){
        return console.log('data kosong')
    }
    data = notes;
    handleSetContainer(data);
}
getDataNotes();