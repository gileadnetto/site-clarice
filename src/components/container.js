

export default function Container(props) {
   
    return (
        <div  className={props?.main ? 'container-site container-main' : '' + ' container-site'}>
            <div className={props?.main ? 'bg-cor-fundo' : ''}>
                {props.children}
            </div>
        </div>
    )
  }
  