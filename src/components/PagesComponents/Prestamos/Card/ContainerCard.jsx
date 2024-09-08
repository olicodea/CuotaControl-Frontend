import CardPestamos from './CardPestamos';

export default function ContainerCard({ stateFilter }) {

    return (
        <>

            {stateFilter.length > 0 ? (
                stateFilter.map(item => {
                    const { id, nombreContacto, nroPrestamo, porcentajeCumplido, estadoPrestamo } = item;
                    return (
                        <CardPestamos
                            key={id}
                            nombreContacto={nombreContacto}
                            nroPrestamo={nroPrestamo}
                            porcentajeCumplido={porcentajeCumplido}
                            estadoPrestamo={estadoPrestamo}
                        />
                    );
                })
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </>
    )
}
