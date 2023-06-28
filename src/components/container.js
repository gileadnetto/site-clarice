

export default function Container(props) {

    


    {/* width: 100vw;
                            max-width: 1000px;
                            height: 1000px;
                            max-height: calc(100vh - 376px); */}

    return (
        <div  className={props?.main ? 'container-site container-main' : '' + ' container-site'}>
            <div className={props?.main ? 'bg-cor-fundo' : ''}>
                {props.children}
            </div>
        </div>
    )
  }
  