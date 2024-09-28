export const fetcher = async ({ ...props }) => {
    try {
      let response:any;
  
      if (!props.endpoint) {
        return;
      }
      if (props.body) {
        response = await fetch(props.endpoint, props.body);
    
      } else {
        response = await fetch(props.endpoint);
      
      }
      let json=await response.json()
    
      return json;
    } catch (error: any) {

      throw new Error(error.message);
    }
  };