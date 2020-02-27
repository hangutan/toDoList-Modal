import React,{useEffect, useCallback} from 'react';
import {MdClear} from 'react-icons/md';

export default function Modal({
        title,
        children,
        isvisible,
        onCancel,
        renderFooter,
        isRenderHeader
    }){
    const _onCancel = useCallback(()=>{
        if(onCancel && typeof onCancel === "function"){
            onCancel();
        }
    },[onCancel]);

    useEffect(() => {
        document.addEventListener('keyup',(e)=>{
            if(e.keyCode === 27){
                onCancel();
            }
        })  
    },[onCancel]);
    
    useEffect(() => {
        if(isvisible){
            document.querySelector('body').classList.add('hnt-modal-open');
        }else{
            document.querySelector('body').classList.remove('hnt-modal-open');
        }
    },[isvisible]);

    const _renderFooter =()=>{
        if(renderFooter && typeof renderFooter ==='function'){
            return renderFooter();
        }else{
            return(
                <div>
                    Html mặc định mình truyền vào
                </div>
            )
        }
    }

    return (
        <div className={`hnt-modal-wrapper ${ isvisible ? 'show' :''}`}>
          <div className="hnt-mask" onClick={_onCancel}></div>
          <div className="hnt-dialog">
            <div className="hnt-modal-content">
                {
                    isRenderHeader && <div className="hnt-modal-header">
                        {title}
                        <MdClear className="hnt-modal-close" onClick={_onCancel}/>
                    </div>
                }
                
                <div className="hnt-modal-body">
                    {children}
                </div>
    
                <div className="hnt-modal-footer">
                    {
                        _renderFooter()
                    }
                </div>
            </div>
          </div>
        </div>
    )
}