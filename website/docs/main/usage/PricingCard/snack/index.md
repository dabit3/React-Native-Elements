```SnackPlayer name=RNE Pricing
import React from 'react';
import { ScrollView } from 'react-native';
import { PricingCard, colors } from 'react-native-elements';

type PricingCardComponentProps = {};

const Pricing: React.FunctionComponent<PricingCardComponentProps> = () => {
  return (
    <>
      <ScrollView>
        <PricingCard
          color={colors.primary}
          title="Free"
          price="$0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={colors.secondary}
          title="Starter"
          price="$19"
          info={['10 Users', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={colors.secondary2}
          title="Enterprise"
          price="$49"
          info={['100 Users', 'One on One Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
      </ScrollView>
    </>
  );
};

export default Pricing;
```
