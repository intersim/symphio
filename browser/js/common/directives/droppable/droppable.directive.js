app.directive('droppable', function($compile, CompositionFactory){
  return {
    scope: {
      drop: '&'
    },
    link: function(scope, element) {
      var elem = element[0];
      var counter = 0;

      elem.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'copyMove';
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );

      elem.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );

      elem.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );

      elem.addEventListener(
        'drop',
        function(e) {
          if (e.stopPropagation) e.stopPropagation();
          if (e.preventDefault) e.preventDefault();
          this.classList.remove('over');

          var oldItem = document.getElementById( e.dataTransfer.getData('Text') );
          var newItem = oldItem.cloneNode(true);

          // grab info

          // THIS NEEDS TO ADD TO NEW TRACK/MEASURE AND REMOVE FROM OLD
          // - THERE IS NO DISTINCTION HERE
          var info = this.id.split('-');
          var loopId = newItem.dataset.loop;
          var measure = info[info.indexOf('m') + 1];
          var track = info[info.indexOf('t') + 1];

          
          //remove old notes before adding new ones
          if (oldItem.getAttribute('type') === 'move') {
            var oldInfo = oldItem.id.split('-');
            var oldLoop = oldItem.dataset.loop;
            var oldTrack = oldInfo[oldInfo.indexOf('t') + 1];
            var oldMeasure = oldInfo[oldInfo.indexOf('m') + 1];
            CompositionFactory.removeLoop(oldLoop, oldTrack, oldMeasure);
            oldItem.remove();
          }

          //now add new notes
          CompositionFactory.addLoop(loopId, track, measure);
          
          scope.$apply('drop()');

          return false;
        },
        false
      );

    }
  }
})