 const mongoose= require('mongoose');            //Installing and setting up Mongoose
'mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })';
var Schema=mongoose.Schema                         //Create a person
var personSchema =  new Schema({
    name: { type: String, required: true }, 
    age: Number,
    favoritefood: [String],
    });

var person = mongoose.model('person',personSchema); //create model
let gomycode = function(done){
    return new person({
        name: 'Slim',
        age: 40,
        favoritefood: ['pizza', 'ijja', 'lablebi']
    })
    if(error) return done(error);
    done(null,result);
    
}
console.log('personadded');
// create many records:
var createManyPeople = function(arrayOfPeople,done){
    person.create (arrayOfPeople,function(err,people){
        if (err) return console.log(err);
        done(null,people);
    });
};
//Use model.find() to Search Database
var findPeoplebyname = function(personName,done){
    person.find({name: personName},function(err,peopleFound){
       if (err) return console.log(err);
        done(null,peopleFound);
    });
};
//Use model.findOne() to Search  Database
var findOneByFood = function (food,done){
    person.findOne({favoritefood: food},function(error,favoritefoodperson) {
if (error) return console.log(error);
        done(nul,favoritefoodperson);
    });
};
// Find person BY ID function
var findPersonByID = function(personID,done){
    person.findById(personID,function(err,individual){
        if (err) return console.log(err);
        done(null,individual);
    });
};
//Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = function(personID,done){
    var foodtoAdd = 'hamburger';
    person.findById(personID,function(error,person){
        if (error) return console.log(error);
        person.favoritefood.push(foodtoAdd);
        person.save((err,data) => {
            if (err) return console.log(err);
            done(null,data);
        });
    });
};
//Perform New Updates on a Document Using model.findOneAndUpdate()
   var findandupdate = function(personName,done){
       person.findOneAndUpdate({name:personName},{age:20},{new : true},function(error,foudperson){
           if (error) return console.log(error);
           done(nul,foudperson);
       });
   };
   //Delete One Document Using model.findByIdAndRemove

   var removebyID = function(personID,done){
       person.findByIdAndDelete(personID,function(error,persontoremove){
          if(error) return console.log(error);
          done(null,persontoremove); 
       });
   };
//MongoDB and Mongoose - Delete Many Documents with model.remove()
   var removemanypeople = function(done){
       var nametoremove = 'Mary';
       person.remove(nametoremove,function(error, removalinfo){
           if (error) return console.log(error);
           done(null,removalinfo);
       });
   };