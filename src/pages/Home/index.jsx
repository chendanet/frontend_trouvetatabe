import React from 'react'
import 'pages/Home/index.css'

function Main() {
    return (
        <section>
            <div className="container-image">
                <div>
                    <p className="para-action">Et si on sortait ?</p>
                    <p className="para-action">Avec Trouve Ta Table, trouvez et</p>
                    <p className="para-action">
                    réservez le lieu qui vous convient.
                    </p>
               </div>
                <div>
                <input type="text" placeholder="City, Address" />
                <button className=" btn-go">Let's go</button>
               </div>
            </div>
            <div className="container-category">
                <h2>OÙ VOULEZ-VOUS ALLER AU RESTAURANT ?
                </h2>
                <div className="container-btn">
                    <div>
                    <button className="btn btn-outline-light btn-category">paris</button>
                    <button className="btn btn-outline-light btn-category">paris</button>
                    <button className="btn btn-outline-light btn-category">paris</button>
                    <button className="btn btn-outline-light btn-category">paris</button>
                    <button className="btn btn-outline-light btn-category">paris</button>
                    </div>
                    <div>
                        <button className="btn btn-outline-light btn-category">paris</button>
                        <button className="btn btn-outline-light btn-category">paris</button>
                        <button className="btn btn-outline-light btn-category">paris</button>
                    </div>
                </div>
            </div>
            <div className="section-blog">
                <h2>LE BLOG DE TROUVE TON RESTO</h2>
                <p>
                Nos bonnes adresses, des interviews, les recettes des plus grands chefs, de l'actu food et des astuces culinaires...
Un condensé de gastronomie dans le blog Trouve Ton Resto. Chaud devant !
                </p>
                <div className="img-blog">
                    <div><img src="https://images.unsplash.com/photo-1600210492090-a159ffa3aeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80" alt="" className="img-item-blog" /></div>
                    <div><img src="https://images.unsplash.com/photo-1585917641362-9fbb6fcfc371?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1382&q=80" alt="" className="img-item-blog"/></div>
                    <div><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" alt="" className="img-item-blog"/></div>
                </div>
            </div>
        </section>
    )
}

export default Main
