import CardPestamos from './CardPestamos';

export default function ContainerCard({ stateFilter }) {



    return (
        <>


            {stateFilter.length > 0 ? (
                stateFilter.map(item => {
                    const { id, nombreContacto, nroPrestamo, porcentajePagado, estadoPrestamo } = item;
                    console.log(id)
                    return (
                        <CardPestamos
                            key={id}
                            nombreContacto={nombreContacto}
                            nroPrestamo={nroPrestamo}
                            porcentajeCumplido={Number(porcentajePagado)}
                            estadoPrestamo={estadoPrestamo}
                            id={id}
                        />
                    );
                })
            ) : (
                <p>No hay datos disponibles.</p>
            )}

        </>
    )
}
