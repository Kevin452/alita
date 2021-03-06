export default () => `
interface LayoutInstanceProps {
  alivePathnames:string[],
  keepAliveViewMap:{}
}
let LayoutInstance:LayoutInstanceProps;
function dropByCacheKey(pathname: string) {
  if (LayoutInstance) {
    const { alivePathnames, keepAliveViewMap } = LayoutInstance;
    const index = alivePathnames.findIndex(item => item === pathname);
    if (index !== -1) {
      alivePathnames.splice(index, 1);
      if (pathname.indexOf('detail') !== -1) {
        const tempName = pathname.split('/').slice(0, 4).join('/');
        if(tempName !== pathname){
          pathname = tempName + ‘/:id';
        }
      }
      // 用来当作key，只有key发生变化才会remout组件
      keepAliveViewMap[pathname].recreateTimes += 1;
    }
  }
}
const setLayoutInstance = (value:any)=>{
  LayoutInstance=value
}
const getLayoutInstance = ()=>LayoutInstance;

export {
  setLayoutInstance,getLayoutInstance,dropByCacheKey
}
`;
