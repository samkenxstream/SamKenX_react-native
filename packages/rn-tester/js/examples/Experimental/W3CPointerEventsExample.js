/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import {Button, StyleSheet, ScrollView, View, Text} from 'react-native';
import * as React from 'react';

import PointerEventAttributesHoverablePointers from './W3CPointerEventPlatformTests/PointerEventAttributesHoverablePointers';
import PointerEventPointerMove from './W3CPointerEventPlatformTests/PointerEventPointerMove';
import CompatibilityAnimatedPointerMove from './Compatibility/CompatibilityAnimatedPointerMove';
import CompatibilityNativeGestureHandling from './Compatibility/CompatibilityNativeGestureHandling';
import PointerEventPrimaryTouchPointer from './W3CPointerEventPlatformTests/PointerEventPrimaryTouchPointer';
import PointerEventAttributesNoHoverPointers from './W3CPointerEventPlatformTests/PointerEventAttributesNoHoverPointers';
import PointerEventPointerMoveOnChordedMouseButton from './W3CPointerEventPlatformTests/PointerEventPointerMoveOnChordedMouseButton';
import PointerEventPointerMoveAcross from './W3CPointerEventPlatformTests/PointerEventPointerMoveAcross';
import PointerEventPointerMoveEventOrder from './W3CPointerEventPlatformTests/PointerEventPointerMoveEventOrder';
import PointerEventPointerMoveBetween from './W3CPointerEventPlatformTests/PointerEventPointerMoveBetween';
import PointerEventPointerOverOut from './W3CPointerEventPlatformTests/PointerEventPointerOverOut';
import PointerEventLayoutChangeShouldFirePointerOver from './W3CPointerEventPlatformTests/PointerEventLayoutChangeShouldFirePointerOver';
import PointerEventPointerCancelTouch from './W3CPointerEventPlatformTests/PointerEventPointerCancelTouch';
import PointerEventClickTouch from './W3CPointerEventPlatformTests/PointerEventClickTouch';
import PointerEventClickTouchHierarchy from './W3CPointerEventPlatformTests/PointerEventClickTouchHierarchy';
import EventfulView from './W3CPointerEventsEventfulView';
import ManyPointersPropertiesExample from './Compatibility/ManyPointersPropertiesExample';
import PointerEventClickTouchHierarchyPointerEvents from './W3CPointerEventPlatformTests/PointerEventClickTouchHierarchyPointerEvents';

function AbsoluteChildExample({log}: {log: string => void}) {
  return (
    <View style={styles.absoluteExampleContainer}>
      <EventfulView
        onUp
        onDown
        onEnter
        onLeave
        log={log}
        style={StyleSheet.compose(styles.eventfulView, styles.parent)}
        name="parent">
        <EventfulView
          onUp
          onDown
          onEnter
          onLeave
          log={log}
          emitByDefault
          style={StyleSheet.compose(styles.eventfulView, styles.absoluteChild)}
          name="childA"
        />
      </EventfulView>
    </View>
  );
}

function RelativeChildExample({log}: {log: string => void}) {
  return (
    <>
      <EventfulView
        log={log}
        style={StyleSheet.compose(styles.eventfulView, styles.parent)}
        onUp
        onOver
        onOut
        onDown
        onEnter
        onLeave
        name="parent">
        <EventfulView
          log={log}
          onUp
          onOver
          onOut
          onDown
          onEnter
          onLeave
          style={StyleSheet.compose(styles.eventfulView, styles.relativeChild)}
          name="childA">
          <EventfulView
            log={log}
            onUp
            onOver
            onOut
            onDown
            onEnter
            onLeave
            style={StyleSheet.compose(
              styles.eventfulView,
              styles.relativeChild,
            )}
            name="childB"
          />
        </EventfulView>
      </EventfulView>
    </>
  );
}

function PointerEventScaffolding({
  Example,
}: {
  Example: React.AbstractComponent<{log: string => void}>,
}) {
  const [eventsLog, setEventsLog] = React.useState('');
  const clear = () => setEventsLog('');
  const log = (eventStr: string) => {
    setEventsLog(currentEventsLog => `${eventStr}\n${currentEventsLog}`);
  };
  return (
    <ScrollView>
      <Example log={log} />
      <View>
        <View style={styles.row}>
          <Text>Events Log</Text>
          <Button onPress={clear} title="Clear" />
        </View>
        <Text>{eventsLog}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  absoluteExampleContainer: {
    height: 200,
  },
  absoluteChild: {
    position: 'absolute',
    top: 100,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: 'red',
  },
  eventfulView: {
    paddingBottom: 40,
  },
  relativeChild: {borderWidth: 1, margin: 10},
  parent: {
    margin: 20,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {
  title: 'W3C PointerEvents experiment',
  category: 'Experimental',
  description: 'Demonstrate pointer events',
  showIndividualExamples: true,
  examples: [
    {
      name: 'pointerevent_attributes_hoverable_pointers',
      description: 'Requires physical device + mouse',
      title: 'WPT 1: Pointer Events hoverable pointer attributes test',
      render(): React.Node {
        return <PointerEventAttributesHoverablePointers />;
      },
    },
    {
      name: 'pointerevent_attributes_nohover_pointers',
      title: 'WPT 2: Pointer Events no-hover pointer attributes test',
      render(): React.Node {
        return <PointerEventAttributesNoHoverPointers />;
      },
    },
    {
      name: 'pointerevent_pointermove',
      title: 'WPT 3: PointerMove test',
      render(): React.Node {
        return <PointerEventPointerMove />;
      },
    },
    {
      name: 'pointerevent_primary_touch_pointer',
      description: 'Requires multi-touch (difficult on emulator)',
      title: 'WPT 4: Pointer Event primary touch pointer test',
      render(): React.Node {
        return <PointerEventPrimaryTouchPointer />;
      },
    },
    {
      name: 'pointerevent_pointermove_on_chorded_mouse_button',
      description: 'Requires physical device + mouse',
      title: 'WPT 5: PointerEvents pointermove on button state changes',
      render(): React.Node {
        return <PointerEventPointerMoveOnChordedMouseButton />;
      },
    },
    {
      name: 'pointerevent_pointermove_across',
      description:
        'Works best with a mouse, can be done with touch if you start outside the indicated elements',
      title: 'WPT 6: Pointermove handling across elements',
      render(): React.Node {
        return <PointerEventPointerMoveAcross />;
      },
    },
    {
      name: 'pointerevent_pointermove_event_order',
      title: 'WPT 7: PointerEvent - pointermove event order',
      render(): React.Node {
        return <PointerEventPointerMoveEventOrder />;
      },
    },
    {
      name: 'pointerevent_pointermove_between',
      title: 'WPT 8: Pointermove handling between elements',
      render(): React.Node {
        return <PointerEventPointerMoveBetween />;
      },
    },
    {
      name: 'pointerevent_pointerover_out',
      title: 'WPT 9: PointerOver/PointerOut handling',
      render(): React.Node {
        return <PointerEventPointerOverOut />;
      },
    },
    {
      name: 'pointerevent_layout_change_should_fire_pointerover',
      description: 'Currently expected to fail',
      title: 'WPT 10: Layout change should fire pointerover',
      render(): React.Node {
        return <PointerEventLayoutChangeShouldFirePointerOver />;
      },
    },
    {
      name: 'pointerevent_pointercancel_touch',
      title: 'WPT 11: Pointer Events pointercancel Tests',
      render(): React.Node {
        return <PointerEventPointerCancelTouch />;
      },
    },
    {
      name: 'pointerevent_click_touch',
      title: 'Pointer Events: basic click test',
      render(): React.Node {
        return <PointerEventClickTouch />;
      },
    },
    {
      name: 'pointerevent_click_touch_hierarchy',
      title: 'Pointer Events: hierarchy click test',
      render(): React.Node {
        return <PointerEventClickTouchHierarchy />;
      },
    },
    {
      name: 'pointerevent_click_touch_hierarchy_pointerEvents',
      title: 'Pointer Events: hierarchy click test with pointerEvents',
      render(): React.Node {
        return <PointerEventClickTouchHierarchyPointerEvents />;
      },
    },
    {
      name: 'relative',
      description: 'Children laid out using relative positioning',
      title: 'Relative Child',
      render(): React.Node {
        return <PointerEventScaffolding Example={RelativeChildExample} />;
      },
    },
    {
      name: 'absolute',
      description: 'Children laid out using absolute positioning',
      title: 'Absolute Child',
      render(): React.Node {
        return <PointerEventScaffolding Example={AbsoluteChildExample} />;
      },
    },
    CompatibilityAnimatedPointerMove,
    CompatibilityNativeGestureHandling,
    ManyPointersPropertiesExample,
  ],
};
