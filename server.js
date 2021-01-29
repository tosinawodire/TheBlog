const express = require('express');
mongoose = require('mongoose')
const  bodyParser = require('body-parser');
ejs = require('ejs');
app = express();
const _ = require('lodash');

const homeStartingContent = "This is the home. This is where you view all news and posts. This is a blog"
const homeContent = "Take no thought to what thou will drink or eat for your heavenly father knows what to yo need"
const aboutContent = "We are a group of young professionals poised with the passion to circulate the world with real, educative and highly innovative information"

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser:true, useUnifiedTopology:true}); //conncetion to the mongodb database


const postSchema = mongoose.Schema({
    postTitle:{
        type:String,
        required:true
    },
    postBody:{
        type:String,
        required:true
    },
    
    postDate:{
        type:Date,
        default:Date.now
    },
    fname:{
        type:String,
        required:true
    }

   
});
const Post = new mongoose.model('Post', postSchema)

app.get('/', (req, res)=>{
    Post.find(function(err, result){
        if (err)
        {
            console.log(err)

        }else{
            //console.log(result);
            res.render('home', {record:result})
        }
    })
}
)


app.get('/about', (req, res)=> {
    res.render('about', {about:aboutContent})
})

app.get('/contact', (req, res)=> {
    res.render('contact')
})

app.get('/compose', (req, res)=> {
    res.render('compose')
})

app.post('/compose', (req,res)=>{
    //const {postTitle, postBody} = req.body;
    let postTitle = _.lowerCase(req.body.postTitle);
    let postBody = req.body.postBody;
    let postDate = req.body.postDate;
    let fname = req.body.fname;

    
 
    const newPost = new Post({
     postTitle, postBody, postDate,fname
    })
 
    newPost.save(function(err){
        if(err){
            console.log(err)
        }else
        {
            res.redirect('/')
        }
 
    })
 
 })

//  app.get('/post', (req, res)=>{
//     Post.find(function(err, result){
//         if (err)
//         {
//             console.log(err)

//         }else{
//             //console.log(result);
//             res.render('post', {record:result})
//         }
//     })
// }
// )

 

 app.listen(1050, function() {

    console.log("server started at port 1050")
})

app.get('/post/:postName', (req, res)=> {
    const requestedTitle =  _.lowerCase(req.params.postName);
    
    Post.findOne({postTitle:requestedTitle}, function(err, result){
        
 

        if(err){
            console.log(err);
        } else {

           

            const t =result.postTitle;

            const p = result.postBody;
            const time = result.postDate;
            const user = result.fname;
            const newTitle = _.lowerCase(t);
           //console.log(newTitle);
           res.render('post', {post:t,comm:p, pd:time, user:user});
           
         
           
            
            //console.log(result);

           

        }
        

        // if(err){
        //     console.log(err)
        // }else if(result.postTitle = requestedTitle)
        // {
        //     res.render('post')

        // }

                
            


        
        
    })
      
 
    })
  
 
             
               