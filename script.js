// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);
const modelViewer = document.querySelector('#clock-viewer');

// 等模型載入完成後才開始跑時間
modelViewer.addEventListener('load', () => {
  
  // 建立一個每秒執行的循環
  setInterval(() => {
    const now = new Date();
    
    // 取得時、分、秒
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // 計算角度 (360度制)
    const secDeg = seconds * 6; // 每秒 6 度
    const minDeg = minutes * 6 + seconds * 0.1; 
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    // 找到模型內部的指針物件並旋轉它
    // 假設你在 Blender 裡的物件名稱叫 SecondHand, MinuteHand, HourHand
    const scene = modelViewer.model.symbols; 
    
    // model-viewer 操控內部骨架/零件的方式較特殊：
    const secondHand = modelViewer.variantData; // 這部分會因版本而異
    
    // 最通用的做法是直接操作 orientation (如果是獨立物件)
    // 但如果要分別轉動，建議使用 Three.js 的寫法如下：
  }, 1000);
});
 // 建立每秒執行一次的循環
    setInterval(() => {
      const now = new Date();
      
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      // 計算旋轉角度 (360度制)
      // 注意：根據你在 Blender 導出的方向，可能需要調整正負號
      const secDeg = -seconds * 6; 
      const minDeg = -minutes * 6;
      const hourDeg = -(hours % 12) * 30 - (minutes * 0.5);

      // 抓取模型內部的節點 (Nodes)
      // 這裡的名稱必須跟 Blender 裡的一模一樣
      const SecondHand = modelViewer.model.nodes['Seconds'];
      const MinuteHand = modelViewer.model.nodes['Minutes'];
      const HourHand= modelViewer.model.nodes['Hours'];

      // 套用旋轉 (假設是繞著 Y 軸轉，如果你的時鐘是躺著的，可能要改 .rotation.z)
      if (secondNode) secondNode.rotation.setFromQuaternion([0, Math.sin(secDeg * Math.PI / 360), 0, Math.cos(secDeg * Math.PI / 360)]);
      if (minuteNode) minuteNode.rotation.setFromQuaternion([0, Math.sin(minDeg * Math.PI / 360), 0, Math.cos(minDeg * Math.PI / 360)]);
      if (hourNode) hourNode.rotation.setFromQuaternion([0, Math.sin(hourDeg * Math.PI / 360), 0, Math.cos(hourDeg * Math.PI / 360)]);

    }, 1000);
  });
