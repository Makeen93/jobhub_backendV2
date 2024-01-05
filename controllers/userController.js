const User = require("../models/User");
// const Skill = require("../models/Skills");
const Skills = require("../models/Skills");
const Agent = require("../models/Agent");

module.exports = {
    updateUser: async (req, res) => {
        try{
            await User.findByIdAndUpdate(
                req.user.id,
                {$set:req.body},
                {new:true})
                res.status(200).json({status:true})
        }catch(error){
            res.status(500).json({error:error})
        }
    },
    deleteUser: async (req, res) => {
        try{
            await User.findByIdAndDelete(req.user.id)
                res.status(200).json({status:true})
        }catch(error){
            res.status(500).json({error:error})
        }
    },
    getUser: async(req,res)=>{
        try{
            const profile=await User.findById(req.user.id)
            const {password,createdAt,updatedAt,__v,...userData}=profile._doc;

            res.status(200).json(userData)
        }catch(error){
            res.status(500).json({error:error})
        }
    },

    addSkills: async(req,res)=>{
        const newSkill=await Skills({userId:req.user.id,Skill:req.body.Skill}) 
        
        try{
            await newSkill.save();
            await User.findByIdAndUpdate(req.user.id,{$set:{skills:true}})
            res.status(200).json({status:true})
        }catch(error){
            res.status(500).json({error:error})
        }
    },
    getSkills:async (req,res)=>{
        const userId=req.user.id;
        try{
            const skills=await Skills.find({userId:userId},{createdAt:0,updatedAt:0,__v:0});
            if(skills.length==0){
                return res.status(200).json([]);
            }
            res.status(200).json(skills);
        }catch(error){
            res.status(500).json({error:error})
        }
    },
    deleteSkill: async (req, res) => {
        const id=req.params.id;
        try{
            await Skills.findByIdAndDelete(id)
            res.status(200).json({status:true})
        }catch(error){
            res.status(500).json({error:error})
        }
    },
    addAgent: async(req,res)=>{
        const newAgent=await Agent({
            userId:req.user.id,
            uid:req.user.uid,
            company:req.user.company,
            hq_address:req.user.hq_address,
            working_hrs:req.user.working_hrs,
}) 
        
        try{
            await newAgent.save();
            await User.findByIdAndUpdate(req.user.id,{$set:{isAgent:true}})
            res.status(200).json({status:true})
        }catch(error){
            res.status(500).json({error:error})
        }
    },
    updateAgent: async(req,res)=>{
        const id=req.params.id;
        try{
            const updateAgent=await Agent.findByIdAndUpdate(id,{
                // userId:req.user.id,
                // uid:req.user.uid,
                company:req.user.company,
                hq_address:req.user.hq_address,
                working_hrs:req.user.working_hrs,
            },{new:true});
            if(!updateAgent){
                return res.status(404).json({status:false,message:'Agent not found'})
            }
            // await User.findByIdAndUpdate(req.user.id,{$set:{skills:true}})
            res.status(200).json({status:true})
        }catch(error){
            res.status(500).json({error:error.message})
        }
    },
    getAgent:async (req,res)=>{
        // const userId=req.user.id;
        try{
            const agentData=await Agent.find({uid:req.params.uid},{createdAt:0,updatedAt:0,__v:0});
            const agent=agentData[0];
            res.status(200).json(agent);
        }catch(error){
            res.status(500).json({error:error.message})
        }
    },
    getAgents:async (req,res)=>{
        try{
            const agents=User.aggregate([
                {$match:{isAgent:true}},
                {$sample:{size:7}},
                {
                    $project:{
                        _id:0,
                        username:1,
                        profile:1,
                        uid:1
                    }
                }
            ]);
            res.status(200).json(agents);
        }catch(error){
            res.status(500).json({error:error.message})

        }
    }
}