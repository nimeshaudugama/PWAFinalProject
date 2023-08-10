const output = document.getElementById('selectedOption');

document.getElementById('dropdown').addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    console.log('Selected Option:', selectedOption);

    switch (selectedOption) {
        case 'Battery Status API':
            handleBatteryStatusAPI()
            
            break;
        case 'Network Information API':
            handleNetworkInformation()
          
            break;
        // Add more cases as needed
        default:
            output.textContent = 'None';
            break;
    }
});


async function handleBatteryStatusAPI() {
    if ('getBattery' in navigator) {
    const battery = await navigator. getBattery ();
    console. log( 'Battery:', battery);
    const writeBatteryInfo = () => {
        const batteryCharging = battery.charging ? 'Yes' : 'No'; 
        const batteryLevel = (battery. level * 100). toFixed(0) + '%'
        output.innerHTML = `
        <div>
        Battery charging:
        <strong>${batteryCharging}</strong> </div> <div>
        Battery level:
        <strong>${batteryLevel}</strong> </div> `
        }
      
        writeBatteryInfo();


        battery. addEventListener('chargingchange', () => {
        console.log ('Battery charging:', battery.charging);
        alert(`Battery Charging Status Changed: ${battery.charging ? 'Charging' : 'Not Charging'}`);
        });

    }
    else {
    output. innerText = 'Battery API not supported on this device'
    }


    }
    function handleNetworkInformation(){
        output.textContent = selectedOption;

    }