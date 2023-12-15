'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // const auth = app.middleware.auth()
  // 用户
  // 获取用户列表页用户信息详细
  router.get('/user/searchUserInfo',controller.user.show);
  router.get('/user/getUserList',controller.user.getUserList)
  // 获取当前用户信息
  router.post('/user/userInfo',controller.user.getUserInfo)
  router.post('/user/register', controller.user.create);
  router.post('/user/updateUserInfo', controller.user.update);
  router.post('/user/login', controller.user.login);
  router.get('/user/searchRole', controller.user.searchRole);
  router.post('/user/delect', controller.user.destroy);
  // router.post('/user/searchByName', controller.user.searchByName);

  
  
// 简历
router.post('/resume/createResume', controller.resume.create);
router.get('/resume/getResumeList',controller.resume.getResumeList)
router.get('/resume/searchResumeInfo', controller.resume.search);
router.post('/resume/updateResumeInfo', controller.resume.update);
router.post('/resume/approve', controller.resume.approve);
router.post('/resume/delect', controller.resume.destroy);
router.post('/resume/upload', controller.resume.upload);


// 团队
router.post('/team/createTeam', controller.team.create);
router.get('/team/getTeamList',controller.team.getTeamList)
router.get('/team/searchTeamInfo', controller.team.search);
router.post('/team/updateTeamInfo', controller.team.update);
router.post('/team/delect', controller.team.destroy);



// 职位
router.post('/post/createPost', controller.post.create);
router.get('/post/getPostList',controller.post.getPostList)
router.get('/post/searchPostInfo', controller.post.search);
router.post('/post/updatePostInfo', controller.post.update);
router.post('/post/delect', controller.post.destroy);

// 面试

router.post('/interview/createInterview', controller.interview.create);
router.get('/interview/getInterviewList',controller.interview.getInterviewList)
router.get('/interview/searchInterviewInfo', controller.interview.search);
router.post('/interview/updateInterviewInfo', controller.interview.update);
router.post('/interview/delect', controller.interview.destroy);
router.post('/interview/closeInterview', controller.interview.closeInterview)
// 进度
router.post('/progress/createProgress', controller.progress.create);
router.get('/progress/getProgressList',controller.progress.getProgressList)
};

