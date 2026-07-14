const storyToast=document.createElement('div');
storyToast.className='story-toast';
storyToast.setAttribute('role','status');
document.body.append(storyToast);
let toastTimer;
function showStoryToast(){
  storyToast.textContent='✦ saved to your live story';
  storyToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>storyToast.classList.remove('show'),2600);
}
const saveBeforeToast=save;
save=function(){saveBeforeToast();showStoryToast()};
