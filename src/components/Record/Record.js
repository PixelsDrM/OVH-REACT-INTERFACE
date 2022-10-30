import { useState, useEffect } from 'react'

const API_URL=process.env.REACT_APP_API_URL

export default function Record() {
    var [records, setRecords] = useState([])
    var [zoneError, setZoneError] = useState(null)
    
    var zone = window.location.pathname.split('/')[1]
    
    useEffect(() => {        
        function fetchRecords() {
            fetch(`${API_URL}/domain/zone/${zone}/record`)
            .then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        if(data.length > 0) {
                            Promise.all(data.map(async record => {
                                const response = await fetch(`${API_URL}/domain/zone/${zone}/record/${record}`)
                                if (response.status === 200) {
                                    return response.json()
                                }
                            }))
                            .then(data => {
                                setRecords(data)
                            })
                        }
                    })
                } else {
                    setZoneError("Zone not found")
                }
            })
        }

        if(zone) {
            fetchRecords()
        }
    }, [zone])

    if(!zone) {
        return <p>Select a DNS Zone</p>
    } else if (zoneError) {
        return <p>{zoneError}</p>
    } else if (records.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subdomain
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Target
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TTL
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    records.map((record) => (
                        <tr key={record.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{record.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{record.fieldType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{record.subDomain}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{record.target}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{record.ttl}</div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    )
}
