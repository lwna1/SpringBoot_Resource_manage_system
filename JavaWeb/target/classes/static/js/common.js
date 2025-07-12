(function ()
{
    //获取用户信息
    let userData = JSON.parse(sessionStorage.getItem("user"))

    //获取标签元素
    const userAvatar_img = document.querySelector('.commonNavigate .userAvatar img')  //用户头像
    const userAvatar_nickName = document.querySelector('.commonNavigate .userAvatar .nickName')
    const LeaveBtn = document.querySelector('.commonNavigate .Leave a')
    const body = document.querySelector('body')

    //改变用户照片
    userAvatar_img.src = userData.avatar
    //改变用户昵称
    userAvatar_nickName.innerHTML = userData.nickname

    //退出登录
    LeaveBtn.addEventListener('click',function (e)
    {
        e.preventDefault()
        sessionStorage.removeItem("user")
        window.location.href = 'login.html'
    })

    //头像交互(鼠标移入移除)
    userAvatar_img.addEventListener('mouseenter',function (e)
    {
        userAvatar_img.style.transform = 'scale(1.3) translate(0,-50%)'
        let x = e.currentTarget.offsetLeft + e.currentTarget.offsetWidth
        let y = e.currentTarget.offsetTop + e.currentTarget.offsetHeight
        const tip = document.createElement('p')
        tip.id = 'tip'
        tip.innerHTML = '点击头像前往个人空间'
        body.appendChild(tip)
    })

    userAvatar_img.addEventListener('mouseleave',function ()
    {
        userAvatar_img.style.transform = 'scale(1.0) translate(0,-50%)'
        const tip = document.getElementById('tip')
        tip.remove()
    })
})()