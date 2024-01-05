const Bookmark=require('../models/Bookmark')

const Job=require('../models/Job')
module.exports = {
    createBookmark: async (req, res) => {
        const jobId=req.body.job;
        const userId=req.user.id;
        try{
            const job=await Job.findById(jobId);
            if(!job){
                return res.status(400).json({message:"Job not found"});
            }
            const newBookmark=new Bookmark({job:jobId,userId:userId});
            const saveBookmark=await newBookmark.save();
            return res.status(200).json({status:true,bookmarkId:saveBookmark._id})
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },
    deleteBookmark: async (req, res) => {
        const bookmarkId=req.params.id;
        try{
            await Bookmark.findByIdAndRemove(bookmarkId);
            return res.status(200).json({status:true,message:"Bookmark deleted"})
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },

    getAllBookmark: async (req, res) => {
        const userId=req.user.id;
        try{
            const bookmarks=await Bookmark.find({userId:userId},{createdAt:0,updatedAt:0,__v:0})
            .populate({
                path:'job',select:"-requirements -description -createdAt -updatedAt -__v "
            })
            return res.status(200).json(bookmarks)
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },

    getBookmark: async (req, res) => {
        const jobId=req.params.id;
        const userId=req.user.id;
        try{
            const bookmark=await Bookmark.findOne({userId:userId,job:jobId})
            if(!bookmark){
                return res.status(200).json(null);
            }
            return res.status(200).json({status:true,bookmarkId:bookmark._id})
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },
}