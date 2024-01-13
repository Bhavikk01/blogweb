const { addBlog, getBlogs, getBlogById, deleteBlogById, editBlog } = require("../controller/blog_controller");

const router = require("express").Router();

router.post('/addBlog', addBlog);
router.get('/getAllBlog', getBlogs);
router.get('/getBlogById/:id', getBlogById);
router.get('/blog/delete/:id', deleteBlogById);
router.post('/editBlog', editBlog);
module.exports = router;