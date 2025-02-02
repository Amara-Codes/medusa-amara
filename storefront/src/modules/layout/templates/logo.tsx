export default  function Logo() {


    return (
        <div style={{width: '120px'}}>
            <div style={{border: '2px solid #000000', background: '#000000'}}>
                <div style={{display: 'flex', justifyContent: 'center', border: '2px solid #ffffff', margin: '4px'}}>
                    <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3px 3px 6px 3px', textAlign:'center', gap: '3px'}}>
                        <p  style={{color: '#ffffff', width: '100%', fontFamily: 'Dye, serif', lineHeight: 'normal', fontSize: '30px'}}>Amara</p>
                        <p  style={{color: '#ffffff', width: '100%', fontFamily: 'Dye, serif', lineHeight: 'normal', fontSize: '22px'}}>Beer Lab</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

