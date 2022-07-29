import { createContext, useMemo } from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

const DEFAULT = {
	store: {},
	setStore: () => {},
};

const AppStore = createContext( DEFAULT );

export const webApiFetchSettings = async ( options = {} ) => {
	return await apiFetch( {
		url: window.WPPW.resturl + '/web/v1/settings',
		...options,
	} );
};

export const reformStore = ( store, endpoint, response ) => {
	return {
		...store,
		[ _camelCase( endpoint ) ]: response,
	};
};

export const AppStoreProvider = ( { children } ) => {
	const [ booted, setBooted ] = useState( false );
	const [ hasError, setError ] = useState( false );
	const [ store, setStore ] = useState( {} );

	const contextStore = useMemo(
		() => ( { store, setStore, booted, setBooted, hasError, setError } ),
		[ store, booted, hasError ]
	);

	useEffect( () => {
		if ( false === booted ) {
			webApiFetchSettings()
				.then( ( settings ) => {
					setStore( { ...store, ...window.WPPW, ...settings } );
					window.WPPW.migrated = true;
					setBooted( true );
				} )
				.catch( ( error ) => {
					setError( error );
				} );
		}
	}, [] );

	return (
		<AppStore.Provider value={ contextStore }>
			{ ' ' }
			{ children }{ ' ' }
		</AppStore.Provider>
	);
};

export default AppStore;
