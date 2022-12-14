import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if( Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
        else{

        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del Formulario
        if([ nombre, propietario, email, fecha, sintomas ].includes('')) {
            setError(true);
            return;
        }

        setError(false);

        // Objeto de Paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if(paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState );

            setPacientes(pacientesActualizados);
            setPaciente({});
        }
        else{
            // Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        // Reiniciar el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade pacientes y {''}
                <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
                {error && <Error mensaje='Todos los campos son obligatorios' />} {/* Si hay un error ejecuta el componente */}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>

                    <input type="text" id="mascota" placeholder="Nombre de la mascota..." value={nombre} onChange={ (e) => setNombre(e.target.value)} className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>

                    <input type="text" id="propietario" placeholder="Nombre del propietario..." value={propietario} onChange={ (e) => setPropietario(e.target.value)} className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>

                    <input type="email" id="email" placeholder="Email del propietario..." value={email} onChange={ (e) => setEmail(e.target.value)} className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Fecha de alta
                    </label>

                    <input type="date" id="alta" value={fecha} onChange={ (e) => setFecha(e.target.value)} className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>

                    <textarea id="sintomas" placeholder="Descripción de los síntomas..." value={sintomas} onChange={ (e) => setSintomas(e.target.value)} className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400" />
                </div>

                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-700 cursor-pointer transition-colors" value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
            </form>
        </div>
    )
}

export default Formulario